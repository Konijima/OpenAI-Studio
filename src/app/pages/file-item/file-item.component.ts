import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent extends BasePageComponent {
  public file!: OpenAIRetrieveFileResponse;
  public fileContent!: string;

  public isLoading = true;

  override ngOnInit(): void {
    super.ngOnInit();

    this.refresh();
  }

  refresh(): void {
    this.isLoading = true;
    Promise.all([
      this.filesService.fetchFile(this.id).then((file) => {
        this.file = file;
      }),
      this.filesService.fetchFileContent(this.id).then((fileContent) => {
        this.fileContent = fileContent.trim();
      }),
    ])
      .then(() => {
        this.isLoading = false;
        this.updatePrism();
        console.log('File and content loaded', this.file);
      })
      .catch((error) => {
        console.error('Error loading file or content', error);
      });
  }

  async delete() {
    const index = await window.FileSystem.showConfirmDialog({
      title: 'Delete file',
      type: 'warning',
      buttons: ['Cancel', 'Delete'],
      message: `Are you sure you want to delete the file "${this.file.filename}"?`,
    });

    if (index === 1) {
      this.filesService.deleteFile(this.file.id).then((result) => {
        if (result.deleted) this.router.navigate(['/files']);
      });
    }
  }

  async save(type: 'json' | 'jsonl' | 'csv' | 'txt') {
    const filePath = await window.FileSystem.openSaveDialog({
      title: `Save ${type.toUpperCase()} file`,
      defaultPath:
        (await window.FileSystem.getDocumentsPath()) +
        this.file.id +
        '.' +
        type,
    });

    if (!filePath) return;

    // The file extension of the remote file
    let ext = window.FileSystem.getFileExtension(this.file.filename) ?? 'jsonl';

    // The final file content
    let fileContent = this.fileContent;

    // Convert the file content to the desired type
    if (type === 'json') {
      // If the desired type is JSON
      if (ext === 'jsonl') {
        // If the remote file is JSONL
        fileContent = window.FileSystem.jsonlToJson(this.fileContent);
      } else if (ext === 'csv') {
        // If the remote file is CSV
        fileContent = window.FileSystem.csvToJson(this.fileContent);
      }
    } else if (type === 'jsonl') {
      // If the desired type is JSONL
      if (ext === 'json') {
        // If the remote file is JSON
        fileContent = window.FileSystem.jsonToJsonl(this.fileContent);
      } else if (ext === 'csv') {
        // If the remote file is CSV
        fileContent = window.FileSystem.jsonToJsonl(
          window.FileSystem.csvToJson(this.fileContent)
        );
      }
    } else if (type === 'csv') {
      // If the desired type is CSV
      if (ext === 'json') {
        // If the remote file is JSON
        fileContent = window.FileSystem.csvToJson(this.fileContent);
      } else if (ext === 'jsonl') {
        // If the remote file is JSONL
        const json = window.FileSystem.jsonlToJson(this.fileContent);
        fileContent = window.FileSystem.jsonToCsv(json);
      }
    }

    await window.FileSystem.saveFileContent(filePath, fileContent);
  }
}

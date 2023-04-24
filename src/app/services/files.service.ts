import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private files: OpenAIBaseFile[] = [];

  /**
   * Emits when the data is received
   * - This is used to update the data in the table
   */
  public readonly onDataReceived = new BehaviorSubject<OpenAIBaseFile[]>([]);

  constructor(private zone: NgZone) {
    this.fetchFiles();
  }

  /**
   * Returns the list of files
   */
  public getFiles() {
    return this.files;
  }

  /**
   * Fetches the list of files from OpenAI
   */
  public async fetchFiles() {
    return await window.OpenAI.listFiles()
      .then((files) => {
        this.zone.run(() => {
          this.files = files.data;
        });
      })
      .finally(() => {
        this.onDataReceived.next(this.files);
        return this.files;
      });
  }

  /**
   * Fetches the file from OpenAI
   * @param id  The file id
   * @returns The file
   */
  public async fetchFile(id: string) {
    return await window.OpenAI.retrieveFile(id);
  }

  /**
   * Fetches the file content from OpenAI
   * @param id The file id
   * @returns The file content
   */
  public async fetchFileContent(id: string) {
    return await window.OpenAI.retrieveFileContent(id);
  }

  /**
   * Delete a file from OpenAI
   * @param id The file id
   * @returns The result of the deletion
   */
  public async deleteFile(id: string) {
    const result = await window.OpenAI.deleteFile(id);
    if (result.deleted) {
      this.files = this.files.filter((file) => file.id !== id);
      this.onDataReceived.next(this.files);
    }
    return result;
  }
}

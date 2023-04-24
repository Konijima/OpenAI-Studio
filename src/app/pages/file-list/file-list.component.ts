import { Component, ViewChild } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent extends BasePageComponent {
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  displayedColumns: string[] = ['id', 'purpose', 'created_at'];
  dataSource = new MatTableDataSource<OpenAIBaseFile>();

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.push(
      this.filesService.onDataReceived.subscribe((files) => {
        this.dataSource.data = files;
        if (this.sort) {
          this.sort.active = 'purpose';
          this.sort.direction = 'asc';
        }
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      })
    );
  }

  // navigate to file
  view(id: string): void {
    this.router.navigate(['/files', id]);
  }

  refresh(): void {
    this.isLoading = true;
    this.filesService.fetchFiles();
  }
}

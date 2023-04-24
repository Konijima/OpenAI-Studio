import { Component, ViewChild } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fine-tune-list',
  templateUrl: './fine-tune-list.component.html',
  styleUrls: ['./fine-tune-list.component.scss'],
})
export class FineTuneListComponent extends BasePageComponent {
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  displayedColumns: string[] = ['id', 'model', 'status', 'created_at'];
  dataSource = new MatTableDataSource<OpenAIFineTune>();

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.push(
      this.fineTunesService.onDataReceived.subscribe((fineTunes) => {
        this.dataSource.data = fineTunes;
        if (this.sort) {
          this.sort.active = 'id';
          this.sort.direction = 'asc';
        }
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      })
    );
  }

  // navigate to fine-tune
  view(id: string): void {
    this.router.navigate(['/fine-tunes', id]);
  }

  refresh(): void {
    this.isLoading = true;
    this.fineTunesService.fetchFineTunes();
  }
}

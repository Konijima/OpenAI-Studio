import { Component, ViewChild } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss'],
})
export class ModelListComponent extends BasePageComponent {
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  displayedColumns: string[] = ['id', 'owned_by', 'created'];
  dataSource = new MatTableDataSource<OpenAIModel>();

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.push(
      this.modelService.onDataReceived.subscribe((models) => {
        this.dataSource.data = models;
        if (this.sort) {
          this.sort.active = 'id';
          this.sort.direction = 'asc';
        }
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      })
    );
  }

  // navigate to file
  view(id: string): void {
    this.router.navigate(['/models', id]);
  }

  refresh(): void {
    this.isLoading = true;
    this.modelService.fetchModels();
  }
}

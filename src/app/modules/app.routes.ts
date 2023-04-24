import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileListComponent } from '../pages/file-list/file-list.component';
import { ModelListComponent } from '../pages/model-list/model-list.component';
import { FineTuneListComponent } from '../pages/fine-tune-list/fine-tune-list.component';
import { ApiKeyComponent } from '../pages/api-key/api-key.component';
import { FileItemComponent } from '../pages/file-item/file-item.component';
import { ModelItemComponent } from '../pages/model-item/model-item.component';
import { FineTuneItemComponent } from '../pages/fine-tune-item/fine-tune-item.component';

const routes: Routes = [
  // Models
  {
    path: 'models',
    component: ModelListComponent,
    data: { title: 'Models' },
  },
  {
    path: 'models/:id',
    component: ModelItemComponent,
    data: { title: 'Models' },
  },

  // Files
  { path: 'files', component: FileListComponent, data: { title: 'Files' } },
  {
    path: 'files/:id',
    component: FileItemComponent,
    data: { title: 'Files' },
  },

  // Fine-Tunes
  {
    path: 'fine-tunes',
    component: FineTuneListComponent,
    data: { title: 'Fine-Tunes' },
  },
  {
    path: 'fine-tunes/:id',
    component: FineTuneItemComponent,
    data: { title: 'Fine-Tunes' },
  },

  // API Key
  {
    path: 'api-key',
    component: ApiKeyComponent,
    data: { title: 'My API Key' },
  },

  // Default
  { path: '**', redirectTo: '/api-key', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

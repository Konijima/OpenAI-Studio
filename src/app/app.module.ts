import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/app.routes';
import { AppMaterialModule } from './modules/app.material';

// Components
import { AppComponent } from './app.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { ApiKeyComponent } from './pages/api-key/api-key.component';
import { FineTuneListComponent } from './pages/fine-tune-list/fine-tune-list.component';
import { FineTuneItemComponent } from './pages/fine-tune-item/fine-tune-item.component';
import { FileListComponent } from './pages/file-list/file-list.component';
import { FileItemComponent } from './pages/file-item/file-item.component';
import { ModelListComponent } from './pages/model-list/model-list.component';
import { ModelItemComponent } from './pages/model-item/model-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BasePageComponent,
    ApiKeyComponent,
    FineTuneListComponent,
    FineTuneItemComponent,
    FileListComponent,
    FileItemComponent,
    ModelListComponent,
    ModelItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-model-item',
  templateUrl: './model-item.component.html',
  styleUrls: ['./model-item.component.scss'],
})
export class ModelItemComponent extends BasePageComponent {
  model!: OpenAIRetrieveModelResponse;

  public isLoading = true;

  override ngOnInit(): void {
    super.ngOnInit();

    Promise.all([
      this.modelService.fetchModel(this.id).then((model) => {
        this.model = model;
      }),
    ])
      .then(() => {
        this.isLoading = false;
        console.log('Model loaded', this.model);
      })
      .catch((error) => {
        console.error('Error loading model', error);
      });
  }
}

import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-fine-tune-item',
  templateUrl: './fine-tune-item.component.html',
  styleUrls: ['./fine-tune-item.component.scss'],
})
export class FineTuneItemComponent extends BasePageComponent {
  fineTune!: OpenAIRetrieveFineTuneResponse;

  public isLoading = true;

  override ngOnInit(): void {
    super.ngOnInit();

    Promise.all([
      this.fineTunesService.fetchFineTune(this.id).then((fineTune) => {
        this.fineTune = fineTune;
      }),
    ])
      .then(() => {
        this.isLoading = false;
        console.log('Fine-tune loaded', this.fineTune);
      })
      .catch((error) => {
        console.error('Error loading fine-tune', error);
      });
  }
}

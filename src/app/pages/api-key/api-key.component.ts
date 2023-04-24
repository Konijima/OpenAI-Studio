import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.scss'],
})
export class ApiKeyComponent extends BasePageComponent {
  public apiKey!: string;

  override ngOnInit() {
    super.ngOnInit();

    this.apiKey = window.OpenAI.getApiKey();
  }

  public canSave() {
    return this.apiKey !== window.OpenAI.getApiKey();
  }

  public saveApiKey() {
    window.OpenAI.setApiKey(this.apiKey);
    this.apiKey = window.OpenAI.getApiKey();
  }

  public openApiKeyLink() {
    window.Browser.openUrlInBrowser('https://beta.openai.com/account/api-keys');
  }
}

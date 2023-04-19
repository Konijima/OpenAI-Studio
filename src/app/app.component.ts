import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';

  constructor() {
    console.log(window.OpenAI);

    window.OpenAI.setApiKey('sk-************************************');
    window.OpenAI.listModels().then((data) => console.log(data));
  }
}

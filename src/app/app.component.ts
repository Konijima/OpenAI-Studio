import { Component, NgZone } from '@angular/core';
import { OpenAI } from './app.module';
import { ModelsService } from './services/models.service';
import { FineTunesService } from './services/fine-tunes.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  text: string = '';

  constructor(
    private zone: NgZone,
    private modelService: ModelsService,
    private fineTunesService: FineTunesService,
    private filesService: FilesService
  ) {
    if (!OpenAI.isApiKeySet()) return;

    console.log(
      'Fetching initial data...',
      '[models]',
      '[files]',
      '[fine-tunes]'
    );
    Promise.allSettled([
      this.modelService.fetchModels(),
      this.filesService.fetchFiles(),
      this.fineTunesService.fetchFineTunes(),
    ]).then((results) => {
      console.log(
        'Initial Fetch Results:',
        results.map((r) => r.status)
      );
    });

    // testing: stream chat completion
    OpenAI.createStreamChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a javascript developer.',
          },
          {
            role: 'user',
            content: 'Show me a tiny code snippet',
          },
        ],
        max_tokens: 50,
      },
      (data) =>
        this.zone.run(() => {
          this.text += data;
        })
    )
      .then((result) => console.log('Chat Stream Completed', result))
      .catch((err) => console.error(err));
  }
}

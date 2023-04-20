import { Injectable } from '@angular/core';
import { OpenAI } from '../app.module';

@Injectable({
  providedIn: 'root',
})
export class FineTunesService {
  private fineTunes: OpenAIFineTune[] = [];

  constructor() {}

  /**
   * Returns the list of fine-tunes
   */
  public getFineTunes() {
    return this.fineTunes;
  }

  /**
   * Fetches the list of fine-tunes from OpenAI
   */
  public async fetchFineTunes() {
    return await OpenAI.listFineTunes()
      .then((fineTunes) => (this.fineTunes = fineTunes.data))
      .finally(() => {
        return this.fineTunes;
      });
  }
}

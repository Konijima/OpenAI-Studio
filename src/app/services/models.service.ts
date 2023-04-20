import { Injectable } from '@angular/core';
import { OpenAI } from '../app.module';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  private models: OpenAIModel[] = [];

  constructor() {}

  /**
   * Returns the list of models
   */
  public getModels() {
    return this.models;
  }

  /**
   * Fetches the list of models from OpenAI
   */
  public async fetchModels() {
    return await OpenAI.listModels()
      .then((models) => (this.models = models.data))
      .finally(() => {
        return this.models;
      });
  }
}

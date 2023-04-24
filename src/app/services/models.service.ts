import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  private models: OpenAIModel[] = [];

  /**
   * Emits when the data is received
   * - This is used to update the data in the table
   */
  public readonly onDataReceived = new BehaviorSubject<OpenAIModel[]>([]);

  constructor(private zone: NgZone) {
    this.fetchModels();
  }

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
    return await window.OpenAI.listModels()
      .then((models) => {
        this.zone.run(() => {
          this.models = models.data;
        });
      })
      .finally(() => {
        this.onDataReceived.next(this.models);
        return this.models;
      });
  }

  /**
   * Fetches the model from OpenAI
   * @param id The model id
   * @returns The model
   */
  public async fetchModel(id: string) {
    return await window.OpenAI.retrieveModel(id);
  }
}

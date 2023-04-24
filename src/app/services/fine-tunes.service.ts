import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FineTunesService {
  private fineTunes: OpenAIFineTune[] = [];

  /**
   * Emits when the data is received
   * - This is used to update the data in the table
   */
  public readonly onDataReceived = new BehaviorSubject<OpenAIFineTune[]>([]);

  constructor(private zone: NgZone) {
    this.fetchFineTunes();
  }

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
    return await window.OpenAI.listFineTunes()
      .then((fineTunes) => {
        this.zone.run(() => {
          this.fineTunes = fineTunes.data;
        });
      })
      .finally(() => {
        this.onDataReceived.next(this.fineTunes);
        return this.fineTunes;
      });
  }

  /**
   * Fetches the fine-tune from OpenAI
   * @param id The fine-tune id
   * @returns The fine-tune
   */
  public async fetchFineTune(id: string) {
    return await window.OpenAI.retrieveFineTune(id);
  }
}

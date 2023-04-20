import { Injectable } from '@angular/core';
import { OpenAI } from '../app.module';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private files: OpenAIBaseFile[] = [];

  constructor() {}

  /**
   * Returns the list of files
   */
  public getFiles() {
    return this.files;
  }

  /**
   * Fetches the list of files from OpenAI
   */
  public async fetchFiles() {
    return await OpenAI.listFiles()
      .then((files) => (this.files = files.data))
      .finally(() => {
        return this.files;
      });
  }
}

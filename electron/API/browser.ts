import { shell } from 'electron';

export const Browser = {
  /**
   * Open a URL in the default browser.
   * @param url The URL to open.
   */
  openUrlInBrowser(url: string): void {
    shell.openExternal(url);
  },
};

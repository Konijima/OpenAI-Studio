import { ipcRenderer, SaveDialogOptions, MessageBoxOptions } from 'electron';
import { ConfirmDialogOpts, SaveDialogOpts } from './file-system-interfaces';

/**
 * File System API
 */
export const FileSystem = {
  /**
   * Get the shared folder
   */
  async getDocumentsPath(): Promise<string> {
    const result = await ipcRenderer.invoke('getDocumentsPath');
    return result;
  },

  /**
   * Open a dialog to save a file
   * @param options the options of the dialog
   * @returns the path of the file or undefined if the user canceled the dialog
   */
  async openSaveDialog(options: SaveDialogOpts): Promise<string | undefined> {
    const opts = {
      title: options.title,
      defaultPath: options.defaultPath,
      buttonLabel: options.buttonLabel,
      filters: options.filters,
      message: options.message,
      nameFieldLabel: options.nameFieldLabel,
      showsTagField: options.showsTagField,
    } as SaveDialogOptions;

    const result = await ipcRenderer.invoke('showSaveDialog', opts);
    return result;
  },

  /**
   * Show a confirm dialog
   * @param options the options of the dialog
   * @returns the index of the button clicked by the user
   */
  async showConfirmDialog(options: ConfirmDialogOpts): Promise<number> {
    const opts = {
      title: options.title,
      type: options.type,
      buttons: options.buttons,
      message: options.message,
    } as MessageBoxOptions;

    const result = await ipcRenderer.invoke('showConfirmDialog', opts);
    return result;
  },

  /**
   * Save a file content
   * @param path the path of the file
   * @param content the content of the file
   */
  async saveFileContent(path: string, content: string): Promise<void> {
    await ipcRenderer.invoke('saveFileContent', path, content);
  },

  /**
   * This is a very basic file extension parser.
   * @param fileName The name of the file.
   * @returns The file extension.
   */
  getFileExtension(fileName: string): string | undefined {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1) {
      return undefined;
    }
    return fileName.substring(dotIndex + 1).toLowerCase();
  },

  /**
   * This is a very basic JSON to JSONL converter.
   * @param json The JSON string.
   * @returns The JSONL string.
   */
  jsonToJsonl(json: string): string {
    const data: any[] = JSON.parse(json);
    return data.map((obj) => JSON.stringify(obj)).join('\n');
  },

  /**
   * This is a very basic JSONL to JSON converter.
   * @param jsonl The JSONL string.
   * @returns The JSON string.
   */
  jsonlToJson(jsonl: string): string {
    const lines = jsonl.split('\n');
    const data = lines.map((line) => JSON.parse(line));
    return JSON.stringify(data, null, 2);
  },

  /**
   * This is a very basic JSON to CSV converter.
   * @param json The JSON string.
   * @returns The CSV string.
   */
  jsonToCsv(json: string): string {
    const data: any[] = JSON.parse(json);
    const headers = Object.keys(data[0])
      .map((header) => `"${header}"`)
      .join(',');
    const rows = data.map((qa) =>
      Object.values(qa)
        .map((value: any) => {
          if (typeof value === 'object') {
            return JSON.stringify(value).replace(/"/g, "'").replace(/'/g, '""');
          } else {
            return `"${value
              .toString()
              .replace(/"/g, '""')
              .replace(/\r?\n/g, '')}"`;
          }
        })
        .join(',')
    );
    return `${headers}\n${rows.join('\n')}`;
  },

  /**
   * This is a very basic CSV to JSON converter.
   * @param csv The CSV string.
   * @returns The JSON string.
   */
  csvToJson(csv: string): string {
    const rows = csv.split('\n');
    const headers = rows[0]
      .split(',')
      .map((header) => header.replace(/"/g, ''));
    const data = rows.slice(1).map((row) => {
      const values: any[] = [];
      let inQuotes = false;
      let start = 0;
      for (let i = 0; i < row.length; i++) {
        if (row[i] === '"') {
          inQuotes = !inQuotes;
        } else if (row[i] === ',' && !inQuotes) {
          values.push(row.slice(start, i));
          start = i + 1;
        }
      }
      values.push(row.slice(start));
      const obj: Partial<any> = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] ? values[i].replace(/"/g, '') : '';
      });
      return obj;
    });
    return JSON.stringify(data, null, 2);
  },
};

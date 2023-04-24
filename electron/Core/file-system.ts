import { join } from 'path';
import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { app, dialog, ipcMain } from 'electron';

// get the documents path
ipcMain.handle('getDocumentsPath', async () => {
  const result = join(app.getPath('documents'), '/');
  return result;
});

// show a save dialog
ipcMain.handle('showSaveDialog', async (event, options) => {
  const result = dialog.showSaveDialogSync(options);
  return result;
});

// show a confirm dialog
ipcMain.handle('showConfirmDialog', async (event, options) => {
  const result = dialog.showMessageBoxSync(options);
  return result;
});

// save a file content
ipcMain.handle('saveFileContent', async (event, path, content) => {
  // verify that the file doesnt exist and if it exist make sure its not a system file
  if (existsSync(path)) {
    // check if the file to overwrite is a json, jsonl, csv or txt file
    const ext = path.split('.').pop();
    if (ext !== 'json' && ext !== 'jsonl' && ext !== 'csv' && ext !== 'txt') {
      const result = await dialog.showMessageBox({
        title: 'Cannot overwrite file',
        type: 'error',
        buttons: ['Ok'],
        message: `The file "${path}" cannot be overwritten.`,
      });
      return;
    }

    const result = await dialog.showMessageBox({
      title: 'File already exists',
      type: 'warning',
      buttons: ['Cancel', 'Overwrite'],
      message: `The file "${path}" already exists. Do you want to overwrite it?`,
    });
    if (result.response !== 1) {
      return;
    }
  }

  await writeFile(path, content, { encoding: 'utf8' });
});

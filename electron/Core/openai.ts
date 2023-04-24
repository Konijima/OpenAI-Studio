import { ipcMain, app } from 'electron';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

// generate a random key 256 bits long
const key =
  'RlH97fwOyMMxI3rj5rX9IlZJog5iTPfBrdAydknmBuOxlGgeVtD0xUVqcCjzKbp2tZShvQJNnWwP7E6uca8F1s4YALyf2XK';

// path to the file where the api key is stored
const keyPath = join(app.getPath('home'), '.openai-studio-api-key');

// save the api key
ipcMain.handle('saveApiKey', async (event, apiKey) => {
  if (apiKey !== '' && apiKey !== undefined) {
    // create a cipherkey from key
    const cipherKey = crypto.scryptSync(key, 'salt', 32);

    const iv = crypto.randomBytes(16); // generate random initialization vector
    const cipher = crypto.createCipheriv(algorithm, cipherKey, iv); // create cipher object
    const encrypted = Buffer.concat([cipher.update(apiKey), cipher.final()]); // encrypt data

    await writeFile(
      keyPath,
      `${iv.toString('hex')}:${encrypted.toString('hex')}`,
      { encoding: 'utf8' }
    );
    return;
  }

  await writeFile(keyPath, '', { encoding: 'utf8' });
});

// decrypt the api key
ipcMain.handle('getApiKey', async () => {
  // read the file
  const encrypted = await readFile(keyPath, { encoding: 'utf8' });

  // if the file is empty return an empty string
  if (encrypted === '') {
    throw new Error('No API key found');
  }

  // get the iv and encrypted data
  const [iv, encryptedData] = encrypted.split(':');

  // create a cipherkey from key
  const cipherKey = crypto.scryptSync(key, 'salt', 32);

  // create decipher object
  const decipher = crypto.createDecipheriv(
    algorithm,
    cipherKey,
    Buffer.from(iv, 'hex')
  );

  // decrypt data
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'hex')),
    decipher.final(),
  ]);

  // return the decrypted data
  return decrypted.toString();
});

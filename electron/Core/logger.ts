import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

// Set up logging
const logPath = path.join(app.getPath('home'), 'openai-studio.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

console.log = function (message: string) {
  logStream.write(`${new Date()} - LOG: ${message}\n`);
  process.stdout.write(`${new Date()} - LOG: ${message}\n`);
};

console.warn = function (message: string) {
  logStream.write(`${new Date()} - WARN: ${message}\n`);
  process.stdout.write(`${new Date()} - WARN: ${message}\n`);
};

console.error = function (error: Error) {
  logStream.write(`${new Date()} - ERROR: ${error.stack}\n`);
  process.stderr.write(`${new Date()} - ERROR: ${error.stack}\n`);
};

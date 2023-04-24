/**
 * PRELOAD SCRIPT
 */

import { contextBridge } from 'electron';
import { OpenAI } from './API/openai';
import { Browser } from './API/browser';
import { FileSystem } from './API/file-system';

// Expose the Test object to the renderer process
contextBridge.exposeInMainWorld('OpenAI', OpenAI);
contextBridge.exposeInMainWorld('Browser', Browser);
contextBridge.exposeInMainWorld('FileSystem', FileSystem);

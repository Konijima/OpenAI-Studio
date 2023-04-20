/**
 * PRELOAD SCRIPT
 */

import { contextBridge } from 'electron';
import { OpenAI } from './API/openai';

// Expose the Test object to the renderer process
contextBridge.exposeInMainWorld('OpenAI', OpenAI);

const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desk', { save: (name, b64) => ipcRenderer.invoke('save', name, b64) });

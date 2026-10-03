const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
ipcMain.handle('save', async (e, name, b64) => {
  const r = await dialog.showSaveDialog({ defaultPath: name });
  if (r.canceled || !r.filePath) return false;
  fs.writeFileSync(r.filePath, Buffer.from(b64, 'base64'));
  if (name.endsWith('.pdf')) shell.openPath(r.filePath); else shell.showItemInFolder(r.filePath);
  return true;
});
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 1100, height: 900, autoHideMenuBar: true, title: 'Threadline B2B Catalogue',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true } });
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.loadFile(path.join(__dirname, 'index.html'));
});
app.on('window-all-closed', () => app.quit());

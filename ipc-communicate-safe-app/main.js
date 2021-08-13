const { app, ipcMain, BrowserWindow } = require('electron')
const path = require("path");

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { 
      preload: path.join(__dirname + '/preload.js') //preloadするjs指定
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  // macOS を除き、全ウインドウが閉じられたときに終了します。
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.handle("hello", (event) => {
  return "HelloWorld"
})

ipcMain.on("send-message-sum", (event, data0, data1) => {
  const win = BrowserWindow.getFocusedWindow();
  win.webContents.send("sum_result", (data0+data1))
})
const { app, ipcMain, BrowserWindow, dialog } = require('electron')
const path = require('path')
const fs = require('fs-extra')

let mainWin;

/**
 * ウィンドウを作成する
 */
function createWindow () {
  // ウィンドウを新たに開く
  console.log("Hello")
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // ファイルを開く
  mainWin.loadFile('index.html')
}

// 初期化が終了したらウィンドウを新規に作成する
app.whenReady().then(createWindow)


// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // macOS以外はアプリを終了する
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// アプリがアクティブになった時の処理
// (macOSはDocのアイコンがクリックされたとき）
app.on('activate', () => {
  // ウィンドウがすべて閉じられている場合は新しく開く
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
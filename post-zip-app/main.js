const { app, ipcMain, BrowserWindow, dialog } = require('electron')
const path = require('path')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const FormData = require('form-data')

let mainWin;

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

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  // macOS以外はアプリを終了する
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // ウィンドウがすべて閉じられている場合は新しく開く
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('get-test', async (event, message) => {
  try{
    console.log(message)
    const URL = message.url;
    const res = await fetch(URL)
    if(!res.ok){
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const text = await res.text()
    console.log(text)
    return {request_data: text}
  }catch(err) {
    console.error(err)
    return({request_data: err})
  };
})

ipcMain.handle('post-test', async (event, message) => {
  try{
    console.log(message)
    const URL = message.url;
    const res = await fetch(URL, {method: 'POST', body: 'hoge=1&fuga=5'})
    if(!res.ok){
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const text = await res.text()
    console.log(text)
    return {request_data: text}
  }catch(err) {
    console.error(err)
    return({request_data: err})
  };
})



ipcMain.handle('send-file', async (event, message) => {

  console.log("file open?")
  const paths = dialog.showOpenDialogSync(mainWin, {
    buttonLabel: '開く',  // 確認ボタンのラベル
    //filters: [
    //  { name: 'Text', extensions: ['txt', 'text'] },
    //],
    properties:[
      'openFile',         // ファイルの選択を許可
      'createDirectory',  // ディレクトリの作成を許可 (macOS)
    ]
  });

  // キャンセルで閉じた場合
  if( paths === undefined ){
    return({status: undefined});
  }
  const formData = new FormData();
  formData.append('file', fs.createReadStream(paths[0]))

  //send file
  try{
    console.log(message)
    const URL = message.url;
    const res = await fetch(URL, {method: 'POST', body: formData});
    if(!res.ok){
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const text = await res.text()
    console.log(text)
    return {request_data: text}
  }catch(err) {
    console.error(err)
    return({request_data: err})
  };
})
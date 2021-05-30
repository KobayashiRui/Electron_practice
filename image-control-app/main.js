const { app, ipcMain, BrowserWindow, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

let win;
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
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

ipcMain.handle('img-file-open', async (event) => {
  // ファイルを選択
  console.log("image file open?")
  const paths = dialog.showOpenDialogSync(win, {
    buttonLabel: '開く',  // 確認ボタンのラベル
    filters: [
      { name: 'Image ', extensions: ['png', 'jpg'] },
    ],
    properties:[
      'openFile',         // ファイルの選択を許可
      'createDirectory',  // ディレクトリの作成を許可 (macOS)
    ]
  });

  // キャンセルで閉じた場合
  if( paths === undefined ){
    return({status: undefined});
  }

  // ファイルの内容を返却
  try {
    const file_path = paths[0];

    const {data, info} = await sharp(file_path)
        .rotate(90)
        .resize(200)
        .raw()
        .png()
        .toBuffer({ resolveWithObject: true })
        //.toBuffer((error, data, info) => { //raw形式にしたものをBufferに出力
        //    console.log("info")
        //    console.log(info)
        //    console.log("get data")
        //    console.log(data)
        //    output_info = info;
        //    output_data = data;
        //})
        //.toFile("output.png")
    
    console.log("info")
    console.log(info)
    console.log("data")
    console.log(data)

    //一時保存的な...
    const app_path = app.getPath('userData');
    await sharp(data).toFile(`${app_path}/output.png`)

    return({
        status: true,
        path: file_path,
        type: info.format,
        array_buffer: data,
        img_data:""
      });

  }
  catch(error) {
      console.log("Error")
    return({status:false, message:error.message});
  }
});


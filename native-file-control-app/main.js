const { app, ipcMain, BrowserWindow, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

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

/**
 * [IPC] 指定ファイルの内容を返却
 *
 */
ipcMain.handle('txt-file-open', async (event) => {
  // ファイルを選択
  console.log("text file open?")
  const paths = dialog.showOpenDialogSync(mainWin, {
    buttonLabel: '開く',  // 確認ボタンのラベル
    filters: [
      { name: 'Text', extensions: ['txt', 'text'] },
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
    const buff = fs.readFileSync(file_path);

    return({
      status: true,
      path: file_path,
      text: buff.toString()
    });
  }
  catch(error) {
    return({status:false, message:error.message});
  }
});


ipcMain.handle('img-file-open', async (event) => {
  // ファイルを選択
  console.log("image file open?")
  const paths = dialog.showOpenDialogSync(mainWin, {
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

    console.log(file_path)
    const ext = path.extname(file_path)
    console.log(ext)
    //拡張子を取得
    const buff = fs.readFileSync(file_path); //image binary data
    // base64化
    const base64data = new Buffer.from(buff).toString('base64')

    return({
      status: true,
      path: file_path,
      type: ext.substring(1),
      array_buffer:buff,
      img_data: base64data 
    });
  }
  catch(error) {
    return({status:false, message:error.message});
  }
});
const { app, ipcMain, BrowserWindow, dialog} = require('electron')
const Store = require('electron-store');
const fs = require('fs');

const store = new Store();

//store.set('unicorn', '๐ฆ');
console.log(store.path)
function createWindow () {
  const win = new BrowserWindow({
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
  // macOS ใ้คใใๅจใฆใคใณใใฆใ้ใใใใใจใใซ็ตไบใใพใใ
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

ipcMain.handle('getStoreValue', (event, key) => {
	return store.get(key);
});

ipcMain.handle('setStoreValue', (event, key, value) => {
	return store.set(key, value);
});

ipcMain.handle('openEditor', async (event) => {
  await store.openInEditor()
})

ipcMain.handle('resetStore', async (event) => {
  await store.clear()
})

ipcMain.handle('jsonDataOutput', async (event) => {
  saveJsonFile()
})

ipcMain.handle('jsonDataInput', async (event) => {
  loadJsonFile()
})


function saveJsonFile() {
  console.log("save file")
  const win = BrowserWindow.getFocusedWindow();
  const file_path = dialog.showSaveDialogSync(
      win,
      {
          properties: ['openFile'],
          filters: [
              {
                  name: 'Documents',
                  extensions: ['json']
              }
          ]
      },
  )
 if (file_path) {
   let read_data = fs.readFileSync(store.path)
   fs.writeFileSync(file_path, read_data)
 }
}

function loadJsonFile() {
  const win = BrowserWindow.getFocusedWindow();
  const file_paths = dialog.showOpenDialogSync(
    win, 
    {
      buttonLabel: '้ใ',  // ็ขบ่ชใใฟใณใฎใฉใใซ
      filters: [
        { extensions: ['json'] },
      ],
      properties:[
        'openFile',         // ใใกใคใซใฎ้ธๆใ่จฑๅฏ
      ]
    }
  );
  console.log(file_paths)
  if (file_paths) {
    let read_data = fs.readFileSync(file_paths[0])
    fs.writeFileSync(store.path, read_data)
  }
}


ipcMain.handle('getKeyList', async (event, base_key) => {
  console.log(base_key)
  let data = store.get(base_key);
  console.log(data) 

})
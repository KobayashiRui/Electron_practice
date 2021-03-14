const { app, BrowserWindow } = require('electron')
const {Worker} = require('worker_threads')
const worker1 = new Worker('./test-worker.js', {
  workerData: {worker_name:"worker1", worker_sleeptime:1000}
})
const worker2 = new Worker('./test-worker.js', {
  workerData: {worker_name:"worker2", worker_sleeptime:5000}
})

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  worker1.terminate()
  worker2.terminate()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const process = require('process')


console.log(Object.keys(process.env));

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'hello this is ping')
    createWindow()
    console.log(process.env.CERTIFICATE_PASSWORD);

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


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}
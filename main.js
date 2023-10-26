const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
//自动更新
require('update-electron-app')()

console.log(process.env.CERTIFICATE_PASSWORD);// 唯一证书
console.log(process.env.GITHUB_TOKEN);// github自动发布秘钥

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'hello this is ping')
    createWindow()

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
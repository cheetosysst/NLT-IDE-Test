
const {app, BrowserWindow, Menu } = require('electron')
const electron = require('electron')
const nav = require('./js/sidebar')
const path = require('path')
const nativeImage = electron.nativeImage;

let icon = nativeImage.createFromPath(path.join(__dirname, './src/icon.png'))

let mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({ height: 600, width: 600, icon: icon })
  mainWindow.loadFile('index.html')

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'save',
          click () {
            console.log(mainWindow.webContents.executeJavaScript('console.log(document.textarea.mainTextArea.value)')[0])
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'Test',
      submenu: [
        {
          label: 'I have a custom handler',
          accelerate: 'CmdORCtrl+r',
          click () {
            console.log("123")
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
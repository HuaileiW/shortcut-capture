import debug from 'electron-debug'
import { app, globalShortcut } from 'electron'
import ShortcutCapture from './shortcut-capture'
debug({ showDevTools: 'undocked' })

app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => { })
    .catch(err => {
      console.error('Unable to install `vue-devtools`: \n', err)
    })
  const sc = new ShortcutCapture()
  globalShortcut.register('ctrl+alt+a', () => sc.shortcutCapture())
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

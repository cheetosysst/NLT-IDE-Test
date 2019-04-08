const sidebar = require('./sidebar.js');

function close() {
	mainWindow.webContents.executeJavaScript('closeNav()');
}
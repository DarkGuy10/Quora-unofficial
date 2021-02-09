const { app, session, BrowserWindow, shell, nativeTheme, ipcMain } = require('electron');
const path = require('path');
const Store = require('./BackgroundProcess/store.js')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

var mainWindow;
const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
    	width: 800,
    	height: 600,
    	icon: __dirname + '/src/icons/logo.icns'
	});
	mainWindow.maximize();
  	mainWindow.loadURL('http://quora.com', {userAgent: 'Chrome'});
  	mainWindow.setMenu(null);
  	mainWindow.webContents.on('new-window', (event, url) => {
    	event.preventDefault();
    	mainWindow.loadURL(url);
	});
};

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    theme: 'default'
  }
});

app.on('ready', createWindow);
app.on('ready', async () => { // Loading extensions
//	await session.defaultSession.loadExtension(path.join(__dirname, 'MinorAddons'))
	await session.defaultSession.loadExtension(path.join(__dirname, 'AppSettings'));
	var theme = store.get('theme');
	if(((theme == 'default') && nativeTheme.shouldUseDarkColors) || theme == 'dark'){
		await session.defaultSession.loadExtension(path.join(__dirname, 'DarkTheme'));
	} 
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});


// Adding the context menu
const contextMenu = require('electron-context-menu');
contextMenu({
	append: (defaultActions, params, browserWindow) => [
		{
			label: 'Reload Page',
			click: () => {
				mainWindow.webContents.reload();
			}
		},
		{
			label: 'Go back',
			click: () => {
				mainWindow.webContents.goBack();
			}
		},
		{
			label: 'Go forward',
			click: () => {
				mainWindow.webContents.goForward();
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Quit',
			click: () => {
				app.quit();
			}
		},
		{
			type: 'separator',
		},
		{
			label: 'Help',
			click: () => {
				shell.openExternal('https://darkguy10.github.io/Quora/');
			}
		}
	],
	showSaveImage: true,
	showSaveImageAs: true,
//	showInspectElement: false,
	showSearchWithGoogle: false,
	showLookUpSelection: false
});



// Adding a background renderer process that will take care of
//		1. Saving app settings to appData
//		2. Setting up the tray icon
//		3. Sending desktop notifications
//		4. Automatically updating the app
//
// Damn, why didnt I think of this before? Baka me T_T
/*
var background;
const createBackground = () => {
	background = new BrowserWindow({
    	show: false,
    	webPreferences: {
      		nodeIntegration: true,
      		enableRemoteModule: true
    	}
	});
	background.loadURL(`file://${__dirname}/BackgroundProcess/BackgroundProcess.html`);
};
app.on('ready', createBackground);


ipcMain.on('execute-JS', (event, arg) => {
  mainWindow.webContents.executeJavaScript(arg).then(result => {
  	event.returnValue = result;
  });
})

ipcMain.on('preferences-changed', (event, changed) => {
	if (changed == 'theme') {
		app.relaunch();
		app.quit();
	}
})
*/
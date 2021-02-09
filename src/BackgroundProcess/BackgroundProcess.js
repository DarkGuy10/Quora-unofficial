const {remote, ipcRenderer} = require('electron');
const appConsole = remote.getGlobal('console');
const Store = require('./store.js');

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    theme: 'default'
  }
});

let updateControl = setInterval(Update, 5000);

function Update() {
	// This function is repeated every 5 seconds
	let localTheme = ipcRenderer.sendSync('execute-JS', 'localStorage.getItem("theme");')
	let savedTheme = store.get('theme');
	if (localTheme && savedTheme && localTheme != savedTheme) {
		store.set('theme', localTheme);
		ipcRenderer.sendSync('preferences-changed', 'theme');
	}
}
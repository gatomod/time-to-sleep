// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, ipcMain, session, webContents, shell } = require('electron');
const { join } = require('path');
const { homedir, platform } = require('os');
const { exec } = require('child_process');

// Create the native browser window.
function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 562,
		minWidth: 400,
		minHeight: 300,
		titleBarStyle: 'customButtonsOnHover',
		transparent: true,
		frame: false,
		title: 'Time to sleep',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: join(__dirname, 'preload.js')
		}
	});

	const appURL = app.isPackaged
		? `file://${__dirname}/../build/index.html`
		: 'http://localhost:3000';
	mainWindow.loadURL(appURL);

	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools();
	}

	// cerrar
	ipcMain.on('closeApp', () => {
		app.quit();
		process.exit(0);
	});

	// minimizar
	ipcMain.on('minimizeApp', () => {
		mainWindow.minimize();
	});

	// maximizar
	ipcMain.on('maxRestoreApp', () => {
		if (mainWindow.isMaximized()) {
			mainWindow.restore();
		} else {
			mainWindow.maximize();
		}
	});

	// apagar
	ipcMain.on('startShutdown', (event, args) => {
		const time = args * 60;

		if(platform() === 'linux'){
			exec(`sleep ${time} && shutdown -h now`);
		} else if(platform() === 'win32'){
			exec(`shutdown /s /t ${time}`);
		}

	})

	// detectar maximizar
	mainWindow.on('maximize', () => {
		mainWindow.webContents.send('isMaximized', true);
	});

	// detectar restaurar
	mainWindow.on('unmaximize', () => {
		mainWindow.webContents.send('isMaximized', false);
	});
}

app.on('ready', () => {
	createWindow();
	if (!app.isPackaged) {
		session.defaultSession.loadExtension(
			join(homedir(), '.config/google-chrome/Profile 2/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.7_0/')
		);
	}
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

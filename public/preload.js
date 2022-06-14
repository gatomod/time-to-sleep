const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
	closeApp: () => ipcRenderer.send('closeApp'),
	minimizeApp: () => ipcRenderer.send('minimizeApp'),
	maxRestoreApp: () => ipcRenderer.send('maxRestoreApp'),
	startShutdown: () => ipcRenderer.send('startShutdown'),
});

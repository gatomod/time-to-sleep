import { useState, useEffect } from 'react'
import '../index.css'
import icon from '../assets/icon.png'

import x from '../assets/x.svg'
import minimize from '../assets/minimize.svg'
import maximize from '../assets/maximize.svg'
import floating from '../assets/floating.svg'

// ipc events
const { ipcRenderer } = window.require('electron');

const close = () => ipcRenderer.send('closeApp');
const minimizeWindow = () => ipcRenderer.send('minimizeApp');
const maxRestoreWindow = () => ipcRenderer.send('maxRestoreApp');


export const Title = () => {
	const [isMaximized, setIsMaximized] = useState(false);

	useEffect(() => {
		ipcRenderer.on('isMaximized', (event, arg) => {
			setIsMaximized(arg);
		}, []);


	})
	return (
		<div className='flex bg-slate-900 items-center justify-between select-none'>
				<div className='draggable flex items-center justify-start flex-grow'>
						<img className='ml-2 w-6 h-6' src={icon} draggable={false} alt='' />
						<h1 className='text-slate-100 text-md font-semibold pl-2 py-1'>Time to Sleep</h1>
				</div>
				<div className='flex items-center justify-end'>
				<div className='flex tems-center justify-center hover:bg-slate-700 active:bg-black ease-in-out duration-200'
				onClick={minimizeWindow}>
				<img className='w-8 h-8 p-1 m-2' src={minimize} draggable={false} alt='' />
			</div>
			<div className='flex tems-center justify-center hover:bg-slate-700 active:bg-black ease-in-out duration-200'
				onClick={maxRestoreWindow}>
				<img className='w-8 h-8 p-1 m-2' src={isMaximized ? floating : maximize} draggable={false} alt='' />
			</div>
			<div className='flex tems-center justify-center hover:bg-rose-500 active:bg-rose-700  ease-in-out duration-200'
				onClick={close}>
				<img className='w-8 h-8 p-1 m-2' src={x} draggable={false} alt='' />
			</div>
				</div>
		</div>
	)
}

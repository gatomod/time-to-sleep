import { useEffect, useState } from 'react';
import moment, { duration } from 'moment'

import wallpaper from '../assets/wallpaper.jpg';

import { Radio } from './Main/Radio';
import { Input } from './Main/Input';

const { ipcRenderer } = window.require('electron');

moment.locale('es')

export const Main = () => {
	const [option, setOption] = useState('0');
	const [min, setMin] = useState(0);
	const [hour, setHour] = useState(0);
	const [time, setTime] = useState(0);
	const [startCountdown, setStartCountdown] = useState(false);

	const resetTime = () => {
		setMin(0);
		setHour(0);
		setTime(0);
	}
	
	const initCountdown =  () => {
		setStartCountdown(true);
		ipcRenderer.send('startShutdown', time);
	}


	// Configurar tiempo
	useEffect(() => {
		const opt = parseInt(option);
		resetTime();
		switch(opt) {
			case 1:
				setMin(5);
				break;
			case 2:
				setMin(30);
				break;
			case 3:
				setHour(1);
				break;
			default:
				setMin(0);
		}
	}, [option]);

	// parsear hora
	useEffect(() => {
		const minutes = duration(`${hour}:${min}`).asMinutes();
		setTime(minutes);
	}, [hour, min]);

	return <div
		style={{ backgroundImage: `url(${wallpaper})` }}
		className='
		flex flex-col
		w-full h-screen
		bg-cover bg-bottom bg-no-repeat
		select-none
	'>
		<div
			className='
			flex flex-col md:flex-row
			w-full h-full
			md:justify-around items-center
			backdrop-filter backdrop-blur-md backdrop-brightness-75
		'>
			{/* Elegir tiempo */}
			<div
				className='
				flex flex-col
				content-between justify-center
				px-10 space-y-3
				ease-in-out duration-200
				w-1/2
			'>
				{
					option !== '4' && <div>
						<h1 className='font-bold text-slate-200 text-3xl'>Time to Sleep</h1>
						<h2 className='text-slate-300 text-md whitespace-normal'>Establece una cuenta atrás para apagar el equipo. Simple, sin complicaciones, sin distracciones.</h2>
						<h2 className='text-slate-400 text-md italic pb-8 outline-none'>Código disponible en GitHub (github.com/gatomo-oficial/time-to-sleep)</h2>
					</div>
					
				}
				<Radio
					nameGroup='TimeGroup'
					value='1'
					disabled={startCountdown}
					checkedValue={option}
					onChange={(e) => setOption(e.target.value)}
				>5 minutos</Radio>
				<Radio
					nameGroup='TimeGroup'
					value='2'
					disabled={startCountdown}
					checkedValue={option}
					onChange={(e) => setOption(e.target.value)}
				>30 minutos</Radio>
				<Radio
					nameGroup='TimeGroup'
					value='3'
					disabled={startCountdown}
					checkedValue={option}
					onChange={(e) => setOption(e.target.value)}
				>1 hora</Radio>
				<Radio
					nameGroup='TimeGroup'
					value='4'
					disabled={startCountdown}
					checkedValue={option}
					onChange={(e) => setOption(e.target.value)}
				>Personalizado</Radio>

				{/* Input personalizado */}
				{
					option === '4' &&
					<div className='flex justify-around pt-10'>
						<div className='flex flex-col items-center justify-center'>
							<Input
								value={hour}
								onChange={setHour}
								increment={1}
								disabled={startCountdown}
							/>
							<h1 className='font-bold text-slate-200 text-xl pb-5'>Horas</h1>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<Input
								value={min}
								onChange={setMin}
								increment={5}
								type='min'
								disabled={startCountdown}
							/>
							<h1 className='font-bold text-slate-200 text-xl pb-5'>Minutos</h1>
						</div>
						
					</div>
				}
			</div>

			{/* Visor de tiempo */}
			<div className='flex flex-col justify-center items-center space-y-10'>
					<div className='flex flex-col justify-center items-center space-y-2'>
						<h1 className='font-semibold text-slate-300 text-md'>Cuenta atrás para apagar</h1>
						<h1 className='font-bold text-slate-200 text-2xl'>{startCountdown ? 'Listo' : `${hour} h. ${min} m.`}</h1>
					</div>
				<button
					onClick={initCountdown}
					disabled={time === 0 || startCountdown}
					className='
					flex justify-center align-middle
					px-4 py-2 w-full
					rounded-lg
					ring-4 ring-inset ring-slate-200
					text-slate-200 font-bold text-xl
					hover:bg-slate-200 hover:text-slate-900 hover:shadow-lg
					active:bg-transparent active:shadow-none active:text-slate-200
					ease-in-out duration-200
					disabled:opacity-60
					disabled:cursor-not-allowed
				'>
					Iniciar
				</button>
			</div>
		</div>
	</div>
};

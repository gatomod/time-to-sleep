import '../../index.css';
import more from '../../assets/maximize.svg'
import less from '../../assets/floating.svg'

export const Input = ({ increment, value, onChange, type, disabled }) => {
	const incrementF = () => {
		if(!disabled){
			const newValue = parseInt(value) + increment;
			type === 'min' ? (value < 55 && onChange(newValue)) : onChange(newValue);
		}
	}

	const decrement = () => {
		if(!disabled){
			const newValue = parseInt(value) - increment;
			value > 0 && onChange(newValue);
		}
	}

	return <div className='flex flex-col justify-center items-center'>
		<div onClick={incrementF} className={`justify-center items-center ${disabled && 'cursor-not-allowed'}`}>
			<img className='w-8 h-8' src={more} alt="" />
		</div>
		<div className='justify-center items-center'>
			<h1 className='ease-in-out duration-200 align-middle slashed-zero font-bold text-2xl text-slate-200'>{value}</h1>
		</div>
		<div onClick={decrement} className={`justify-center items-center ${disabled && 'cursor-not-allowed'}`}>
			<img className='w-8 h-8' src={less} alt="" />
		</div>
	</div>
}

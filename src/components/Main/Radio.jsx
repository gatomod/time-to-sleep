import '../../index.css';

export const Radio = ({ children, nameGroup, value, checkedValue, onChange, disabled }) => {
	return <label
		className='
		flex
		justify-start items-center
	'>
		<input
			disabled={disabled}
			name={nameGroup}
			type='radio'
			onChange={onChange}
			value={value}
			checked={value === checkedValue}
			className='
			appearance-none outline-none
			w-5 h-5
			rounded-full 
			bg-slate-300
			ring-4 ring-inset
			ring-slate-300
			checked:bg-blue-600
			ease-in-out duration-200
			disabled:bg-slate-500
			disabled:ring-slate-500
			disabled:cursor-not-allowed
			' />
		<span
			className='
			ml-2
			text-slate-300
			font-semibold text-lg
		'>{children}</span>
	</label>
}

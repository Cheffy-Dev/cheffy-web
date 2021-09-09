import { Input } from 'antd';

const NumericInput = props => {
	const onChange = e => {
		const { value } = e.target;
		const reg = /^\d*(\d*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === '') {
			props.onChange(value);
		}
	};

	const onBlur = () => {
		const { value, onBlur, onChange } = props;
		let valueTemp = value;
		if (value.charAt(value.length - 1) === '.' || value === '-') {
			valueTemp = value.slice(0, -1);
		}
		onChange(valueTemp.replace(/0*(\d+)/, '$1'));
		if (onBlur) {
			onBlur();
		}
	};

	return (
		<Input
			{...props}
			onChange={onChange}
			onBlur={onBlur}
			placeholder='Phone Number'
			maxLength={11}
			className='signup-input'
		/>
	);
};

export default NumericInput;

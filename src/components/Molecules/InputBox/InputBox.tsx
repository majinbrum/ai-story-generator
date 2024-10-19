import { Dispatch, SetStateAction } from "react";

interface InputBoxProps {
	label: string;
	type: string;
	placeholder: string;
	name: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

const InputBox = (props: InputBoxProps) => {
	const { label, type, placeholder, name, value, setValue } = props;

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};

export default InputBox;

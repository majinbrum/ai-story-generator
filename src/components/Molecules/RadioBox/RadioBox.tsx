import { Dispatch, SetStateAction } from "react";

interface RadioBoxProps {
	type: string;
	legend: string;
	name: string;
	valuesArray: string[];

	setValue: Dispatch<SetStateAction<string>>;
}

const RadioBox = (props: RadioBoxProps) => {
	const { type, legend, name, valuesArray, setValue } = props;

	return (
		<fieldset>
			<legend>{legend}</legend>
			{valuesArray.map((item, i) => (
				<div key={item + i}>
					<input
						type={type}
						id={item}
						name={name}
						value={item}
						onChange={(e) => setValue(e.target.value)}
					/>
					<label htmlFor={item}>{item}</label>
				</div>
			))}
		</fieldset>
	);
};

export default RadioBox;

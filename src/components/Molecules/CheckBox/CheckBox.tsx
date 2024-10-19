import { Dispatch, SetStateAction } from "react";

interface CheckBoxProps {
	type: string;
	legend: string;
	name: string;
	valuesArray: string[];

	setValue: Dispatch<SetStateAction<string[]>>;
}

const CheckBox = (props: CheckBoxProps) => {
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
						onChange={(e) => (e.target.checked ? setValue((prevState) => [...prevState, item]) : setValue((prevState) => prevState.filter((item) => item !== e.target.id)))}
					/>
					<label htmlFor={item}>{item}</label>
				</div>
			))}
		</fieldset>
	);
};

export default CheckBox;

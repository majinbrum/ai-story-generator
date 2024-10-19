import { SecondaryFormProps } from "./Form";
import { useState } from "react";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import RadioBox from "@/components/Molecules/RadioBox/RadioBox";
import CheckBox from "@/components/Molecules/CheckBox/CheckBox";

const protagonistAgeArray = ["Child", "Young", "Adult", "Elder"];

const protagonistTraitsArray = ["Brave", "Shy", "Kind-hearted", "Optimistic", "Pessimistic", "Stubborn", "Naive", "Adventurous", "Cautious"];

const FormProtagonist = ({ setStep, updateStoryDetails }: SecondaryFormProps) => {
	const [protagonistName, setProtagonistName] = useState("Elliot");
	const [protagonistAge, setProtagonistAge] = useState("Child");
	const [protagonistTraits, setProtagonistTraits] = useState<string[]>([]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateStoryDetails({ protagonist: { name: protagonistName, age: protagonistAge, traits: protagonistTraits } });
		setStep("setSetting");
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputBox
				label='Protagonist Name'
				type='text'
				placeholder='Elliot'
				name='protagonistName'
				value={protagonistName}
				setValue={setProtagonistName}
			/>
			<RadioBox
				type='radio'
				legend='Protagonist Age'
				name='protagonistAge'
				valuesArray={protagonistAgeArray}
				setValue={setProtagonistAge}
			/>
			<CheckBox
				type='checkbox'
				legend='Protagonist Traits'
				name='protagonistTraits'
				valuesArray={protagonistTraitsArray}
				setValue={setProtagonistTraits}
			/>
			<button type='submit'>Avanti</button>
		</form>
	);
};

export default FormProtagonist;

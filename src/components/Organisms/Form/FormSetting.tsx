import { SecondaryFormProps } from "./Form";
import { useState } from "react";
import RadioBox from "@/components/Molecules/RadioBox/RadioBox";
import CheckBox from "@/components/Molecules/CheckBox/CheckBox";

const settingLocationsArray = ["Real", "Imaginary", "Woods", "Island", "Space", "Desert"];

const settingPeriodsArray = ["Present", "Past", "Future"];

const settingTonesArray = ["Brave", "Optimistic", "Pessimistic", "Adventurous", "Dramatic", "Comedic", "Romantic", "Scary"];

const FormSetting = ({ setStep, updateStoryDetails }: SecondaryFormProps) => {
	const [settingLocation, setSettingLocation] = useState("Woods");
	const [settingPeriod, setSettingPeriod] = useState("Past");
	const [settingTones, setSettingTones] = useState<string[]>([]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateStoryDetails({ setting: { location: settingLocation, period: settingPeriod, tones: settingTones } });
		setStep("setPlot");
	};

	return (
		<form onSubmit={handleSubmit}>
			<RadioBox
				type='radio'
				legend='Setting Location'
				name='settingLocation'
				valuesArray={settingLocationsArray}
				setValue={setSettingLocation}
			/>
			<RadioBox
				type='radio'
				legend='Setting Period'
				name='settingPeriod'
				valuesArray={settingPeriodsArray}
				setValue={setSettingPeriod}
			/>
			<CheckBox
				type='checkbox'
				legend='Setting Tone'
				name='settingTone'
				valuesArray={settingTonesArray}
				setValue={setSettingTones}
			/>
			<button type='submit'>Avanti</button>
		</form>
	);
};

export default FormSetting;

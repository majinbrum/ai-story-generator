import { SecondaryFormProps } from "./Form";
import { useState } from "react";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import RadioBox from "@/components/Molecules/RadioBox/RadioBox";
import { redirect } from "next/navigation";

const plotEndsArray = ["Happy", "Tragic", "Open-ended", "Surprising"];

const FormPlot = ({ setStep, updateStoryDetails }: SecondaryFormProps) => {
	const [plotConflict, setPlotConflict] = useState("Save the village");
	const [plotMission, setPlotMission] = useState("Find a special tree branch which is a magical wand");
	const [plotEnd, setPlotEnd] = useState("Open-ended");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateStoryDetails({ plot: { conflict: plotConflict, mission: plotMission, end: plotEnd } });
		setStep("generateStory");
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputBox
				label='Plot Conflict'
				type='text'
				placeholder='Save the village'
				name='plotConflict'
				value={plotConflict}
				setValue={setPlotConflict}
			/>
			<InputBox
				label='Plot Mission'
				type='text'
				placeholder='Find a special tree branch which is a magical wand'
				name='plotMission'
				value={plotMission}
				setValue={setPlotMission}
			/>
			<RadioBox
				type='radio'
				legend='Plot End'
				name='plotEnd'
				valuesArray={plotEndsArray}
				setValue={setPlotEnd}
			/>
			<button type='submit'>Avanti</button>
		</form>
	);
};

export default FormPlot;

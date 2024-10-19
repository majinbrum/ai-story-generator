"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import FormProtagonist from "./FormProtagonist";
import FormSetting from "./FormSetting";
import FormPlot from "./FormPlot";
import { IStoryDetails, useStoryDetails } from "@/providers/StoryDetailsContext";
import { useStory } from "@/providers/StoryContext";
import { postPrompt } from "@/app/actions/postPrompt";
import { redirect } from "next/navigation";

type Step = "setProtagonist" | "setSetting" | "setPlot" | "generateStory";

export interface SecondaryFormProps {
	setStep: Dispatch<SetStateAction<Step>>;
	updateStoryDetails: (newDetails: Partial<IStoryDetails>) => void;
}

const Form = () => {
	const { storyDetails, updateStoryDetails } = useStoryDetails();
	const { story, setStory } = useStory();
	const [step, setStep] = useState<Step>("setProtagonist");
	const [prompt, setPrompt] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// console.log({ step });
		setStep("setProtagonist");

		setPrompt(`Generate a story with the following data:
				- ${storyDetails.protagonist.name}, of ${storyDetails.protagonist.age} years old is the protagonist. The traits of the protagonist are ${storyDetails.protagonist.traits.join(", ")}.
				- The location of this ${storyDetails.setting.tones.join(", ")} story is ${storyDetails.setting.location}, and the time period is the ${storyDetails.setting.period}.
				- The plot starts narrating about the ${storyDetails.plot.conflict}, when the story starts to unfold the mission gets revealed: ${storyDetails.plot.mission}.
				- The end of the story should be ${storyDetails.plot.end}. `);

		if (prompt) {
			setIsLoading(true);
			const generateAndSetStory = async () => {
				setStory(await postPrompt(prompt));
			};

			generateAndSetStory();
		}
	}, [step === "generateStory"]);

	useEffect(() => {
		if (story) {
			setIsLoading(false);
			redirect("/story");
		}
	}, [story]);

	if (isLoading) return <p>Writing...</p>;

	return (
		<div>
			{step === "setProtagonist" && (
				<FormProtagonist
					setStep={setStep}
					updateStoryDetails={updateStoryDetails}
				/>
			)}

			{step === "setSetting" && (
				<FormSetting
					setStep={setStep}
					updateStoryDetails={updateStoryDetails}
				/>
			)}

			{step === "setPlot" && (
				<FormPlot
					setStep={setStep}
					updateStoryDetails={updateStoryDetails}
				/>
			)}
		</div>
	);
};

export default Form;

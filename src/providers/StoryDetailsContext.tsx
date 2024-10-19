"use client";

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";

interface IProtagonist {
	name: string;
	age: string;
	traits: string[];
}

interface ISetting {
	location: string;
	period: string;
	tones: string[];
}

interface IPlot {
	conflict: string;
	mission: string;
	end: string;
}

const defultProtagonist = {
	name: "Elliot",
	age: "Child",
	traits: ["Brave", "Adventurous"],
};

const defultSetting = {
	location: "Woods",
	period: "Past",
	tones: ["Scary", "Adventurous"],
};

const defultPlot = {
	conflict: "Save the village",
	mission: "Find a special tree branch which is a magical wand",
	end: "Open-ended",
};

export interface IStoryDetails {
	protagonist: IProtagonist;
	setting: ISetting;
	plot: IPlot;
}

interface IStoryDetailsContext {
	storyDetails: IStoryDetails;
	setStoryDetails: Dispatch<SetStateAction<IStoryDetails>>;
	updateStoryDetails: (newDetails: Partial<IStoryDetails>) => void;
}

const defaultStoryDetails = { protagonist: defultProtagonist, setting: defultSetting, plot: defultPlot };
const StoryDetailsContext = createContext<IStoryDetailsContext>({ storyDetails: defaultStoryDetails, setStoryDetails: () => {}, updateStoryDetails: () => {} });

export function StoryDetailsProvider({ children }: PropsWithChildren) {
	const [storyDetails, setStoryDetails] = useState<IStoryDetails>(defaultStoryDetails);

	const updateStoryDetails = (newDetails: Partial<IStoryDetails>) => {
		setStoryDetails((prevState) => ({ ...prevState, ...newDetails }));
	};

	useEffect(() => {
		console.log(storyDetails.protagonist);
	}, [storyDetails.protagonist]);

	useEffect(() => {
		console.log(storyDetails.setting);
	}, [storyDetails.setting]);

	useEffect(() => {
		console.log(storyDetails.plot);
	}, [storyDetails.plot]);

	return <StoryDetailsContext.Provider value={{ storyDetails, setStoryDetails, updateStoryDetails }}>{children}</StoryDetailsContext.Provider>;
}

export const useStoryDetails = () => useContext(StoryDetailsContext);

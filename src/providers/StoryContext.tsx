"use client";

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";

interface IStoryContext {
	story: string;
	setStory: Dispatch<SetStateAction<string>>;
}

export const StoryContext = createContext<IStoryContext>({ story: "Questa storia...", setStory: () => {} });

export function StoryProvider({ children }: PropsWithChildren) {
	const [story, setStory] = useState<string>("");

	useEffect(() => {
		console.log(story);
	}, [story]);

	return <StoryContext.Provider value={{ story, setStory }}>{children}</StoryContext.Provider>;
}

export const useStory = () => useContext(StoryContext);

"use client";

import { useStory } from "@/providers/StoryContext";
import { redirect } from "next/navigation";

export default function StoryPage() {
	const { story, setStory } = useStory();

	if (!story) redirect("/");

	return (
		<>
			<div>{story}</div>
			<button onClick={() => setStory("")}>Create a new story</button>
		</>
	);
}

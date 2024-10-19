import { Dispatch, SetStateAction } from "react";

interface readStoryProps {
	response: string;
	audioLabel: string;
	setAudioLabel: Dispatch<SetStateAction<string>>;
}

export const readStory = (props: readStoryProps) => {
	const { response, audioLabel, setAudioLabel } = props;

	// rate: 0.1/1 slower
	// rate: 1/10 faster
	if (!response) {
		console.error("No response text to read.");
		return;
	}
	if (audioLabel == "Read") {
		const responseSplit = response.split(".");

		responseSplit.forEach((sentence, i) => {
			const utterance = new SpeechSynthesisUtterance(sentence);
			utterance.lang = "en-GB";
			speechSynthesis.speak(utterance);
			setAudioLabel("Pause");

			if (i == responseSplit.length - 1) {
				utterance.onend = () => {
					setAudioLabel("Read");
				};
			}
		});
	}
	if (audioLabel == "Resume") {
		speechSynthesis.resume();
		setAudioLabel("Pause");
	}
	if (audioLabel == "Pause") {
		speechSynthesis.pause();
		setAudioLabel("Resume");
	}
};

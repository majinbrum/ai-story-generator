export const postPrompt = async (prompt: string) => {
	console.log({ prompt });

	try {
		const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt }),
		});
		const data = await response.json();
		return data.output;
	} catch (e) {
		console.error("Error generating story", e);
	}
};

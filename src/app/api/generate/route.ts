import { GoogleGenerativeAI, GenerateContentCandidate } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

interface BodyI {
	prompt: string;
}

const noApiKeyStory1 = `The desert wind whipped Elliot's weathered face, the sun a relentless furnace in the sky. He squinted, the wrinkles around his eyes crinkling further as he surveyed the vast, ochre landscape. At eighty-two, his bones creaked with every step, but his spirit remained as sharp as the obsidian shard he clutched in his gnarled hand. The village, his village, needed him. 
The whispers had started a week ago, spreading through the sun-baked adobe houses like wildfire. The Sand Serpents, those ravenous creatures of the desert, were stirring. Legend spoke of their insatiable hunger, their thirst for the lifeblood of the land. And they were coming for them. 
The elders, their faces etched with worry, had gathered Elliot, their last remaining warrior, their last hope. "The prophecy," they had said, their voices raspy with fear, "it speaks of a magical wand, a branch from the Great Tree, capable of repelling the Serpents." 
The Great Tree, a mythical being whispered to exist in the heart of the desert, its location shrouded in riddles and guarded by ancient spirits. Elliot had spent his life hearing tales of its power, stories passed down from generation to generation, but he had never truly believed. Now, however, the fate of his village hung in the balance. 
Elliot's journey was arduous. The sun beat down mercilessly, the sand shifting under his feet like an unyielding enemy. He found himself questioning his sanity, the mythical tree seeming more like a fantastical dream than a real possibility. 
Then, on the third day, a lone, twisted, tree emerged from the dunes. It was gnarled and ancient, its branches reaching up like gnarled fingers to the heavens. The air around it hummed with an unseen energy. Elliot knew he had found the Great Tree.
He approached cautiously, his heart pounding in his chest. The tree, sensing his presence, seemed to awaken, its leaves rustling like whispers. A voice, deep and resonant, echoed in his mind. "You seek the wand, old man? Prove yourself worthy."
Elliot stared at the tree, confusion swirling in his mind. He was old, his body weary, and the journey had taken its toll. He could barely hold the obsidian shard, let alone wield a magical wand. 
Then, the shard began to glow. It pulsated with an inner light, illuminating the desert around him. The voice returned, this time gentler, almost welcoming. "The true magic lies not in the wand, but within you. You are the warrior, old man. You are the strength of your village." 
The realization hit Elliot like a tidal wave. The prophecy wasn't about a magical wand. It was about him, about the strength and courage that had been dormant within him for decades.
With a newfound resolve, he turned away from the Great Tree, the obsidian shard glowing in his hand. The village needed him. He was their warrior, their protector. And he wouldn't let them down.
He didn't need a magical wand. He had something far more powerful – his will, his spirit, and the unwavering love for his village. The Sand Serpents would not find him wanting. The desert wind whispered a new song, a song of hope, a song of defiance.  The story of the old man, the warrior, had just begun.`;

const noApiKeyStory2 = `Elliot, a boy of ten with eyes the color of moss and hair the shade of a summer oak, stood at the edge of the Whispering Woods. The air hung thick with the scent of pine needles and damp earth, a comforting familiarity to his young nose. His village, nestled in the valley beyond, was in peril. A malevolent shadow had fallen upon their crops, leaving them withered and barren. The elders spoke of a powerful spirit, angered by their disregard for the forest, now seeking to punish them. The only hope, they declared, was a magical wand hidden within the Whispering Woods, capable of appeasing the spirit. The villagers entrusted Elliot with the perilous mission. He was known for his quiet determination, his keen observation of the forest's ways, and his unwavering trust in its magic. Armed with a worn leather pouch and a heart brimming with a strange mix of fear and excitement, Elliot ventured into the heart of the woods. The trees whispered secrets amongst themselves, their rustling leaves forming a chorus that both welcomed and warned him. He followed the winding path, his feet crunching on fallen leaves and his eyes scanning the dense foliage. He remembered the tales whispered by his grandmother, stories of the wood sprites and the wise old oaks that guarded the secrets of the forest. He felt a connection to the ancient trees, a bond born from years of exploration and respect. He reached a clearing, bathed in dappled sunlight, where a giant oak stood tall and proud. This, he knew, was the tree of the old stories, the tree that held the key to the magical wand. Elliot approached the oak reverently, his hand reaching out to touch its gnarled bark. A wave of energy pulsed through his hand, as though the tree itself was trying to communicate with him. He closed his eyes and listened, not with his ears but with his soul. He felt the whispers of the forest, the secrets of the ancient ones, and the murmur of a hidden magic. He felt the wand, not physically, but as a presence, calling to him from within the oak's heart. He traced his fingers over the bark, following a pattern of knots and grooves that seemed to form a message, a cryptic code. As he deciphered the message, he felt a thrill course through him. He knew he was on the right path, the path to the wand, the path to saving his village. But the journey was far from over. The sun was beginning to set, casting long shadows across the clearing. The whispers of the forest had grown louder, now laced with urgency. Elliot turned towards the oak, his heart pounding in his chest. He felt the power of the forest surge around him, urging him forward. He knew he had to find the wand, but the darkness was closing in, and the spirit's anger seemed to be growing stronger. He had to be quick. Elliot knew he had to find the wand, but the darkness was closing in, and the spirit’s anger seemed to be growing stronger. He had to be quick. He took a deep breath, steeled his nerves, and plunged into the heart of the whispering woods. The path ahead was shrouded in mystery, and the fate of his village hung in the balance. The end.`;

export async function POST(req: NextRequest, res: NextResponse<string>) {
	if (req.method === "POST") {
		const { prompt } = (await req.json()) as BodyI;

		if (!prompt) {
			return NextResponse.json({ message: "Missing body." }, { status: 400 });
		}

		try {
			if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
				const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
				const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
				const result = await model.generateContent(prompt);
				const output = (result.response.candidates as GenerateContentCandidate[])[0].content.parts[0].text;

				if (output) {
					return NextResponse.json({ output }, { status: 200 });
				}
			} else {
				//  return NextResponse.json({ message: "API KEY missing." }, { status: 400 });
				const output = noApiKeyStory1;
				return NextResponse.json({ output }, { status: 200 });
			}
		} catch (e) {
			return NextResponse.json({ message: "Error generating story." }, { status: 400 });
		}
	} else {
		return NextResponse.json({ message: "Method not allowed. Only POST requests are allowed." }, { status: 405 });
	}
}

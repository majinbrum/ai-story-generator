import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { StoryDetailsProvider } from "@/providers/StoryDetailsContext";
import { StoryProvider } from "@/providers/StoryContext";
import Image from "next/image";
import styles from "./page.module.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "AI Story Generator",
	description: "Generate your Next story.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<div className={styles.page}>
					<main className={styles.main}>
						<StoryProvider>
							<StoryDetailsProvider>{children}</StoryDetailsProvider>
						</StoryProvider>
					</main>
					<footer className={styles.footer}>
						<a
							href='https://github.com/majinbrum'
							target='_blank'
							rel='noopener noreferrer'>
							<Image
								aria-hidden
								src='https://nextjs.org/icons/github.svg'
								alt='Github icon'
								width={16}
								height={16}
							/>
							@majinbrum
						</a>
					</footer>
				</div>
			</body>
		</html>
	);
}

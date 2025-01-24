/* @jsxImportSource react */

import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const font = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Elliot Topper',
	description: "Elliot Topper's Next.js portfolio",
	applicationName: 'elliotbtopper.com',
	authors: { name: 'Elliot Topper', url: 'https://github.com/xaridar' },
	creator: 'Elliot Topper',
	openGraph: {
		type: 'website',
		url: 'https://elliotbtopper.com',
		title: 'Elliot Topper',
		description: "Elliot Topper's Next.js portfolio",
		siteName: 'elliotbtopper.com',
		images: [
			{
				url: 'https://elliotbtopper.com/imaggs/portfolio.png',
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${font.className} h-screen font-body`}>{children}</body>
		</html>
	);
}

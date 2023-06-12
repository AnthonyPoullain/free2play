import { Header } from './components';
import './globals.css';
import { Ubuntu } from 'next/font/google';

const roboto = Ubuntu({ weight: ['400', '500', '700'], subsets: ['latin'] });

export const metadata = {
	title: 'Free2Play',
	description: 'Répertoire des meilleurs Free2Play!',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<Header />
				<main className="max-w-5xl px-4 py-8 mx-auto">{children}</main>
				<div id="modal"></div>
			</body>
		</html>
	);
}

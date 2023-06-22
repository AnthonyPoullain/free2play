import { Header } from '@/src/components';
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
			<body className={`${roboto.className} overflow-y-hidden`}>
				<Header />
				<main className="h-[calc(100vh-60px)] px-4 py-8 w-full overflow-y-auto">
					<div className="max-w-5xl mx-auto overflow-x-hidden">{children}</div>
				</main>
				<div id="modal"></div>
			</body>
		</html>
	);
}

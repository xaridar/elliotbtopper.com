/* @jsxImportSource react */
import { LogoCarousel } from '@/components/logo_carousel';
import { logos } from '@/lib/logos';
import shuffle from 'shuffle-array';

export default function Home() {
	const shuffled = shuffle(logos, { copy: true });
	return (
		<LogoCarousel
			speed={15}
			productNames={shuffled}
		/>
	);
}

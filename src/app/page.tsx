/* @jsxImportSource react */
'use client'
import { LogoCarousel } from '@/components/logo_carousel';
import { logos } from '@/lib/logos';
import shuffle from 'shuffle-array';
import Typewriter from 'typewriter-effect';

export default function Home() {
	const shuffled = shuffle(logos, { copy: true });
	return (
		<div>
			<Typewriter
				options={{
					cursor: '_',
				}}
				onInit={(tw) => {
					tw.typeString('Hi, my name is <b>Elliot Topper!</b>')
						.pauseFor(3000)
						.deleteAll()
						.start()
				}}
			/>
			<LogoCarousel
				speed={15}
				productNames={shuffled}
			/>
		</div>
	);
}

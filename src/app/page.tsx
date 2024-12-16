/* @jsxImportSource react */
'use client';
import { LogoCarousel } from '@/components/logo_carousel';
import logos from '@/lib/logos';
import shuffle from 'shuffle-array';
import Typewriter from 'typewriter-effect';
import { Tooltip } from 'react-tooltip';
import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
	const [shuffled, setShuffled] = useState<{ name: string; logo: StaticImageData; link: string }[]>([]);
	
	useEffect(() => {
		setShuffled(shuffle(logos, { copy: true }));
	}, []);

	return (
		<div className='h-full w-full flex items-center pt-[30vh] flex-col'>
			<Tooltip
				id='my-tooltip'
				style={{ zIndex: 99 }}
			/>
			<div className='text-5xl text-center'>
				<div className='sm:flex'>
					<span className='whitespace-pre'>Hi, I'm </span>
					<div className='text-blue-700'>
						<Typewriter
							options={{
								cursor: '_',
								strings: 'Elliot Topper',
								autoStart: true,
							}}
							component={'h1'}
						/>
					</div>
				</div>
				<br />
				<span>Nice to meet you!</span>
			</div>
			<LogoCarousel
				speed={20}
				products={shuffled}
			/>
		</div>
	);
}

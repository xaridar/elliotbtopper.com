import { MutableRefObject, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { StringCycler } from '@/components/string_cycler';
import { motion } from 'motion/react';
import { BG } from '@/components/moving_background';
import { AnimatedArrow } from '@/components/animated_arrow';

export const HomeElem = (props: { ref: MutableRefObject<HTMLDivElement> }) => {
	const [shouldDescPlay, setShouldDescPlay] = useState<boolean>(false);
	return (
		<BG
			id='home'
			ref={props.ref}
			baseElement={'section'}
			secondaryColor='black'
			className='h-screen flex items-center justify-center flex-col colored font-semibold'>
			<div className='text-center flex items-center justify-center flex-col -translate-y-12'>
				<div className='text-5xl min-[820px]:text-6xl'>
					<div className='md:flex items-end'>
						<span className='whitespace-pre'>Hi, I'm </span>
						<div className='mx-4 mt-8 text-[rgb(var(--accent-rgb))]'>
							<Typewriter
								onInit={tw => {
									tw.typeString('Elliot Topper')
										.pauseFor(1500)
										.callFunction(() => setShouldDescPlay(true))
										.start();
								}}
								options={{
									cursor: '_',
								}}
								component={'h1'}
							/>
						</div>
					</div>
					<br />
				</div>
				<motion.div
					className='text-4xl text-center sm:flex opacity-0'
					animate={{ opacity: +shouldDescPlay }}>
					<span className='whitespace-pre'>I'm a </span>
					<div className='text-gray-400'>
						<StringCycler
							strings={['software engineer', 'fullstack developer', 'front-end designer', 'tech lover']}
							speed={3000}
							animSpeed={500}
							play={shouldDescPlay}
						/>
					</div>
				</motion.div>
			</div>
			<AnimatedArrow id='projects' />
		</BG>
	);
};

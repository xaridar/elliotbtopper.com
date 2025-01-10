/* @jsxImportSource react */
'use client';
import { LogoCarousel } from '@/components/logo_carousel';
import logos from '@/lib/logos';
import Typewriter from 'typewriter-effect';
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';
import { StringCycler } from '@/components/string_cycler';
import { motion } from 'motion/react';
import { BG } from '@/components/moving_background';
import { AnimatedArrow } from '@/components/animated_arrow';
import { Link } from 'react-scroll';

export default function Home() {
	const [shouldDescPlay, setShouldDescPlay] = useState<boolean>(false);

	return (
		<div>
			<Tooltip
				id='my-tooltip'
				style={{ zIndex: 99 }}
			/>
			<header className='fixed w-full pt-4'>
				<ul className='flex justify-around max-w-lg w-3/5 m-auto py-6 rounded-full bg-[rgba(0,0,0,0.75)] text-[rgb(var(--background-rgb))]'>
					<li className='cursor-pointer hover:scale-110 hover:text-[rgb(var(--accent-rgb))] transition-all'>
						<Link
							to='home'
							smooth={true}
							duration={800}>
							Home
						</Link>
					</li>
					<li className='cursor-pointer hover:scale-110 hover:text-[rgb(var(--accent-rgb))] transition-all'>
						<Link
							to='projects'
							smooth={true}
							duration={800}>
							Projects
						</Link>
					</li>
					<li>Contact</li>
					<li>Resume</li>
				</ul>
			</header>
			<BG
				id='home'
				baseElement={'section'}
				secondaryColor='black'
				className='h-screen w-full text-center flex items-center justify-center flex-col colored'>
				<div className='text-6xl '>
					<div className='sm:flex items-end'>
						<span className='whitespace-pre'>Hi, I'm </span>
						<div className='text-[rgb(var(--accent-rgb))]'>
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
				<Link
					to='projects'
					smooth={true}
					duration={800}>
					<AnimatedArrow color='#cbd5e0' />
				</Link>
			</BG>
			<section
				id='projects'
				className='h-screen text-center pt-28'>
				<h1 className='text-6xl'>Projects</h1>
				<LogoCarousel
					className='w-80'
					repeats={2}
					speed={5}
					shuffle
					products={['React', 'Next.js', 'GitHub', 'Feather Icons', 'TypeScript', 'Tailwind CSS', 'Yarn']}
				/>
			</section>
		</div>
	);
}

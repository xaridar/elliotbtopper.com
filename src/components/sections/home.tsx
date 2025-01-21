import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { StringCycler } from '@/components/string_cycler';
import { motion } from 'motion/react';
import { BG } from '@/components/moving_background';
import { AnimatedArrow } from '@/components/animated_arrow';
import { css } from '@emotion/react';

export const HomeElem = (props: { ref: MutableRefObject<HTMLDivElement> }) => {
	const [shouldDescPlay, setShouldDescPlay] = useState<boolean>(false);
	// "I'm a " width
	const [width, setWidth] = useState<number>(0);
	// cycling string span widths
	const [spanWidths, setSpanWidths] = useState<number[]>([]);
	// total widths of cycling part
	const [totalWidths, setTotalWidths] = useState<number[]>([]);
	// cycling strings
	const [strings] = useState<string[]>([
		'software engineer',
		'full stack developer',
		'front-end designer',
		'tech lover',
	]);
	// current string index from strings
	const [index, setIndex] = useState<number>(-1);
	// current left offset
	const [currLeft, setCurrLeft] = useState<number>(0);
	// tracks first string in string cycler
	const [firstStr, setfirstStr] = useState<boolean>(true);

	const imaRef = useRef<HTMLSpanElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!imaRef.current) return;
		setWidth(imaRef.current.clientWidth);
	}, [imaRef.current?.clientWidth]);

	useEffect(() => {
		setTotalWidths(spanWidths.map(w => w + width));
	}, [width, spanWidths]);

	useEffect(() => {
		if (!parentRef.current || index < 0 || !totalWidths.length) return;
		setCurrLeft((parentRef.current.clientWidth - totalWidths[index]) / 2);
	}, [parentRef.current, totalWidths, index]);

	return (
		<BG
			id='home'
			ref={props.ref}
			baseElement={'section'}
			secondaryColor='black'
			className='h-screen flex items-center justify-center flex-col colored font-semibold'>
			<div
				className='text-center flex items-center sm:items-start justify-center flex-col -translate-y-12'
				ref={parentRef}>
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
					className='relative text-4xl sm:flex opacity-0'
					animate={{ opacity: +shouldDescPlay }}>
					<span
						className={`sm:relative whitespace-pre ${
							!firstStr && 'sm:transition-[left] sm:duration-1000'
						} static`}
						ref={imaRef}
						css={css({ left: currLeft })}>
						I'm a{' '}
					</span>
					<div
						className='static text-gray-400 sm:relative'
						css={css({ left: currLeft })}>
						<StringCycler
							setIndex={setIndex}
							strings={strings}
							speed={3000}
							animSpeed={500}
							waitSpeed={1000}
							play={shouldDescPlay}
							setWidths={setSpanWidths}
							setFirst={setfirstStr}
						/>
					</div>
				</motion.div>
			</div>
			<AnimatedArrow id='projects' />
		</BG>
	);
};

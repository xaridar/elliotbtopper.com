'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import shuffleArray from 'shuffle-array';
import { clearInterval } from 'timers';

interface StringCyclerProps {
	strings: string[];
	speed: number;
	animSpeed: number;
	waitSpeed: number;
	play: boolean;
	setWidths: Dispatch<SetStateAction<number[]>>;
	setIndex: Dispatch<SetStateAction<number>>;
	setFirst: Dispatch<SetStateAction<boolean>>;
	random?: boolean;
}

export const StringCycler = (props: StringCyclerProps) => {
	const [index, setIndex] = useState<number>(-1);
	const [arr, setArr] = useState<string[]>([]);
	const [int, setInt] = useState<NodeJS.Timeout>(null);
	const [opacity, setOpacity] = useState<number>(1);
	const spanRefs = useRef<HTMLSpanElement[]>([]);

	useEffect(() => {
		if (index === -1) return;
		props.setIndex(
			props.strings
				.map((str, i) => ({ str, i }))
				.filter(({ str }) => str === arr[index])
				.map(({ i }) => i)[0]
		);
	}, [index]);

	useEffect(() => {
		props.setWidths(spanRefs.current.map(ref => ref.getBoundingClientRect().width));
	}, [spanRefs]);

	const nextWord = () => {
		if (!arr.length) return;
		props.setFirst(false);
		setOpacity(0);
		setTimeout(() => setIndex(i => (i + 1) % arr.length), props.waitSpeed / 2);
		setTimeout(() => setOpacity(1), props.waitSpeed);
	};

	useEffect(() => {
		if (!props.play) return;
		if (int) clearInterval(int);

		if (props.random) setArr(shuffleArray(props.strings, { copy: true }));
		else setArr([...props.strings]);
	}, [props.play]);

	useEffect(() => {
		if (int || !arr.length) return;
		setIndex(0);
		setInt(setInterval(nextWord, props.speed));
		return () => int && clearInterval(int);
	}, [arr]);

	return (
		<>
			<motion.span
				animate={{ opacity }}
				transition={{ duration: props.animSpeed / 1000 }}>
				{arr[index]}
			</motion.span>
			<div className='invisible absolute w-0 overflow-hidden whitespace-nowrap'>
				{props.strings.map((str, i) => {
					return (
						<div key={`cycler-${i}`}>
							<span
								ref={el => {
									if (el) spanRefs.current[i] = el;
								}}>
								{str}
							</span>
						</div>
					);
				})}
			</div>
		</>
	);
};

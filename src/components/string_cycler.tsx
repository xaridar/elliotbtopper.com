'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import shuffleArray from 'shuffle-array';
import { clearInterval } from 'timers';

interface StringCyclerProps {
	strings: string[];
	speed: number;
	animSpeed: number;
	play: boolean;
	random?: boolean;
}

export const StringCycler = (props: StringCyclerProps) => {
	const [index, setIndex] = useState<number>(0);
	const [arr, setArr] = useState<string[]>([]);
	const [int, setInt] = useState<NodeJS.Timeout>(null);
	const [opacity, setOpacity] = useState<number>(1);

	const nextWord = () => {
		if (!arr.length) return;
		setOpacity(0);
		setTimeout(() => setIndex(i => (i + 1) % arr.length), props.animSpeed);
		setTimeout(() => setOpacity(1), props.animSpeed);
	};

	useEffect(() => {
		if (!props.play) return;
		if (int) clearInterval(int);

		if (props.random) setArr(shuffleArray(props.strings, { copy: true }));
		else setArr([...props.strings]);
	}, [props.play]);

	useEffect(() => {
		if (int || !arr.length) return;
		setInt(setInterval(nextWord, props.speed));
		return () => int && clearInterval(int);
	}, [arr]);

	return (
		<motion.span
			animate={{ opacity }}
			transition={{ duration: props.animSpeed / 1000 }}>
			{arr[index]}
		</motion.span>
	);
};

'use client';

import { Interpolation, Theme } from '@emotion/react';
import { useMotionValue, motion, useAnimationFrame } from 'motion/react';
import { MutableRefObject, useEffect, useRef } from 'react';

interface BGProps {
	baseElement: 'section' | 'div';
	secondaryColor: string;
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
	css?: Interpolation<Theme>;
	id?: string;
	ref?: MutableRefObject<HTMLDivElement>;
}

export const BG = (props: BGProps) => {
	const ref = props.ref || useRef<HTMLDivElement>();
	const xLoc = useMotionValue(50);
	const yLoc = useMotionValue(50);

	const xSmooth = useMotionValue(50);
	const ySmooth = useMotionValue(50);

	const MotionElement = props.baseElement === 'div' ? motion.div : motion.section;

	useEffect(() => {
		ref.current.addEventListener('mousemove', function (e) {
			const bb = this.getBoundingClientRect();
			xLoc.set((e.clientX - 2 * bb.x - bb.width / 2) / 4 / (this.clientWidth / 100) + 50);
			yLoc.set((e.clientY - 2 * bb.y - bb.height / 2) / 4 / (this.clientHeight / 100) + 50);
		});
	}, [ref.current]);

	// Smoothly interpolate values on each animation frame
	useAnimationFrame(() => {
		const currentX = xSmooth.get();
		const currentY = ySmooth.get();

		// Interpolation factor (0.1 = slow, 0.5 = fast)
		const factor = 0.05;
		xSmooth.set(currentX + (xLoc.get() - currentX) * factor);
		ySmooth.set(currentY + (yLoc.get() - currentY) * factor);
	});

	return (
		<MotionElement
			className={props.className + ' mousePos'}
			ref={ref}
			css={props.css}
			id={props.id}
			style={
				{
					'--x-pos': `${xSmooth.get()}%`,
					'--y-pos': `${ySmooth.get()}%`,
					'--secondary-color': props.secondaryColor,
				} as React.CSSProperties
			}>
			{props.children}
		</MotionElement>
	);
};

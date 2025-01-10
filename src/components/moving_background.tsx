'use client';

import { Interpolation, Theme } from '@emotion/react';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react';

interface BGProps {
	baseElement: 'section' | 'div';
	secondaryColor: string;
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
	css?: Interpolation<Theme>;
	id?: string;
}

export const BG = (props: BGProps) => {
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
	const ref = useRef<HTMLDivElement>();

	useEffect(() => {
		ref.current.addEventListener('mousemove', function (e) {
			const bb = this.getBoundingClientRect();
			setMousePos({
				x: (e.clientX - 2 * bb.x - bb.width / 2) / 3 / (this.clientWidth / 100) + 50,
				y: (e.clientY - 2 * bb.y - bb.height / 2) / 3 / (this.clientHeight / 100) + 50,
			});
		});
	}, [ref.current]);

	return (
		<props.baseElement
			className={props.className + ' mousePos'}
			ref={ref}
			css={props.css}
			id={props.id}
			style={
				{
					'--x-pos': `${mousePos?.x}%`,
					'--y-pos': `${mousePos?.y}%`,
					'--secondary-color': props.secondaryColor,
				} as React.CSSProperties
			}>
			{props.children}
		</props.baseElement>
	);
};

'use client';

import Image from 'next/image';
import { css, keyframes } from '@/lib/emotion';
import { useLayoutEffect, useRef, useState } from 'react';
import { Keyframes } from '@emotion/react';
import logos from '../lib/logos';

interface LogoCarouselProps {
	productNames: string[];
	speed: number;
}

export const LogoCarousel = (props: LogoCarouselProps) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = useState<Keyframes>(null);

	useLayoutEffect(() => {
		if (carouselRef.current != null) {
			setScroll(
				keyframes({
					from: { left: 0 },

					to: {
						left: `-${carouselRef.current.clientWidth / 2}px;`,
					},
				}),
			);
		}
	}, [carouselRef.current?.clientWidth]);
	const test = [0,0];

	return (
		<div 
			className='m-auto relative overflow-hidden'
			css={css({
				height: 80,
				width: 550,
			})}>
			<div
				id='x'
				ref={carouselRef}
				className='h-full absolute gap-12 pr-12 start-0 flex justify-start items-center w-max'
				css={css({
					animation: `${scroll} ${props.speed}s linear infinite`,
				})}>
				{test.map(() => 
					props.productNames.map(name => (
							<Image
							className='aspect-initial h-10 w-auto'
							src={
								logos[name
									.replace(/[\s\.]/g, '_')
									.replace('#', 'sharp')
									.toLowerCase()]
							}
							alt={name + ' logo'}
							key={name}></Image>
					))
				)
				}
			</div>
			<div
				className='absolute inset-0 h-full z-10'
				css={css({
					background:
						'linear-gradient(90deg, rgb(var(--background-rgb)) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, rgb(var(--background-rgb)) 100%)',
				})}></div>
		</div>
	);
	``;
};

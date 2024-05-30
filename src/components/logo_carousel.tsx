'use client';

import Image from 'next/image';
import { css, keyframes } from '@/lib/emotion';
import { ReactEventHandler, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Keyframes } from '@emotion/react';

interface LogoCarouselProps {
	productNames: string[];
	speed: number;
}

export const LogoCarousel = (props: LogoCarouselProps) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = useState<Keyframes>(null);
	const [activeLogo, setActiveLogo] = useState<string>('');

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

	return (
		<div
			className='m-auto relative'
			css={css({
				height: 80,
				width: 550,
			})}>
			<div
				ref={carouselRef}
				className='absolute gap-12 pr-12 start-0 flex justify-start items-center h-full w-max'
				css={css({
					animation: `${scroll} ${props.speed}s linear infinite`,
				})}>
				{props.productNames.map(name => (
					<Image
						className='h-10 w-auto'
						src={
							'/images/logos/' +
							name
								.replace(/[\s\.]/g, '_')
								.replace('#', 'sharp')
								.toLowerCase() +
							'.png'
						}
						alt={name + ' logo'}
						key={name}
						height={40}
						width={80}></Image>
				))}
				{props.productNames.map(name => (
					<Image
						className='h-10 w-auto'
						src={
							'/images/logos/' +
							name
								.replace(/[\s\.]/g, '_')
								.replace('#', 'sharp')
								.toLowerCase() +
							'.png'
						}
						alt={name + ' logo'}
						key={name}
						height={40}
						width={80}></Image>
				))}
			</div>
			<div
				className='absolute inset-0 h-full z-10'
				css={css({
					background:
						'linear-gradient(90deg, rgb(var(--background-rgb)) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, rgb(var(--background-rgb)) 100%)',
				})}></div>
			{carouselRef.current?.clientWidth}
		</div>
	);
	``;
};

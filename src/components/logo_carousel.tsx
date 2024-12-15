'use client';

import Image, { StaticImageData } from 'next/image';
import { css, keyframes } from '@/lib/emotion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Keyframes } from '@emotion/react';
import logos from '../lib/logos';

interface LogoCarouselProps {
	products: { name: string; logo: StaticImageData; link: string }[];
	speed: number;
}

export const LogoCarousel = (props: LogoCarouselProps) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = useState<Keyframes>(null);
	const [paused, setPaused] = useState<boolean>(false);

	useLayoutEffect(() => {
		if (carouselRef.current != null) {
			setScroll(
				keyframes({
					from: { left: 0 },

					to: {
						left: `-${carouselRef.current.clientWidth / 2}px;`,
					},
				})
			);
		}
	}, [carouselRef.current?.clientWidth]);

	return (
		<div
			className='m-auto relative overflow-hidden'
			css={css({
				height: 80,
				width: 550,
			})}>
			<div
				id='animatedCarousel'
				ref={carouselRef}
				className='h-full absolute gap-12 pr-12 start-0 flex justify-start items-center w-max'
				css={css({
					animation: `${scroll} ${props.speed * 2}s linear infinite`,
					animationPlayState: paused ? 'paused' : 'running',
				})}>
				{props.products.map(p => (
					<a
						target='_blank'
						href={p.link}
						className='transition-transform'
						data-tooltip-id='my-tooltip'
						data-tooltip-content={p.name}
						key={p.name}>
						<Image
							onMouseEnter={() => setPaused(true)}
							onMouseLeave={() => setPaused(false)}
							className='aspect-initial h-10 w-auto lang-icon'
							src={p.logo}
							alt={p.name + ' logo'}></Image>
					</a>
				))}
				{props.products.map(p => (
					<a
						target='_blank'
						href={p.link}
						data-tooltip-id='my-tooltip'
						data-tooltip-content={p.name}
						key={p.name}>
						<Image
							onMouseEnter={() => setPaused(true)}
							onMouseLeave={() => setPaused(false)}
							className='aspect-initial h-10 w-auto transition-transform lang-icon'
							src={p.logo}
							alt={p.name + ' logo'}></Image>
					</a>
				))}
			</div>
			<div
				className='absolute inset-0 h-full z-10 pointer-events-none'
				css={css({
					background: `linear-gradient(90deg, rgb(var(--background-rgb)) 0%, rgba(var(--background-rgb), ${
						paused ? '.75' : '0'
					}) 40%, rgba(var(--background-rgb), ${paused ? '.75' : '0'}) 60%, rgb(var(--background-rgb)) 100%)`,
				})}></div>
			{/* <div className='absolute inset-0 w-1/5'></div>
			<div className='absolute inset-0 w-1/5 left-auto'></div> */}
		</div>
	);
};

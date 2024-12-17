'use client';

import Image, { StaticImageData } from 'next/image';
import { css, keyframes } from '@/lib/emotion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Keyframes } from '@emotion/react';

interface LogoCarouselProps {
	products: { name: string; logo: StaticImageData; link: string }[];
	speed: number;
}

export const LogoCarousel = (props: LogoCarouselProps) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = useState<Keyframes>(null);
	const [paused, setPaused] = useState<boolean>(false);

	useEffect(() => {
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
	const dupe = [...props.products, ...props.products];

	return (
		<div className='m-auto relative overflow-hidden h-10 py-12 w-full max-w-6xl box-content'>
			<div
				id='animatedCarousel'
				ref={carouselRef}
				className='h-10 absolute gap-12 pr-12 start-0 flex justify-start items-center w-max'
				css={css({
					animation: `${scroll} ${props.speed * 2}s linear infinite`,
					animationPlayState: paused ? 'paused' : 'running',
				})}>
				{dupe.map((p, i) => (
					<a
						target='_blank'
						href={p.link}
						className='transition-transform h-full'
						data-tooltip-id='my-tooltip'
						data-tooltip-content={p.name}
						key={`${p.name}-${i}`}>
						<Image
							onMouseEnter={() => setPaused(true)}
							onMouseLeave={() => setPaused(false)}
							className='aspect-initial h-full w-auto lang-icon'
							src={p.logo}
							alt={p.name + ' logo'}></Image>
					</a>
				))}
			</div>
			<div
				className='absolute inset-0 h-full z-10 pointer-events-none hidden sm:block'
				css={css({
					background: `linear-gradient(90deg, rgb(var(--background-rgb)) 0%, rgb(var(--background-rgb)) 25%, rgba(var(--background-rgb), 0) 40%, rgba(var(--background-rgb), 0) 60%, rgb(var(--background-rgb)) 75%, rgb(var(--background-rgb)) 100%)`,
				})}></div>
			<div
				className='absolute inset-0 h-full z-10 pointer-events-none block sm:hidden'
				css={css({
					background: `linear-gradient(90deg, rgb(var(--background-rgb)) 0%, rgb(var(--background-rgb)) ${
						100 / 12
					}%, rgba(var(--background-rgb), 0) 40%, rgba(var(--background-rgb), 0) 60%, rgb(var(--background-rgb)) ${
						1100 / 12
					}%, rgb(var(--background-rgb)) 100%)`,
				})}></div>
			<div className='absolute inset-0 w-1/12 sm:w-1/4'></div>
			<div className='absolute inset-0 w-1/12 sm:w-1/4 left-auto'></div>
		</div>
	);
};

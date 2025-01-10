'use client';

import Image, { StaticImageData } from 'next/image';
import { css, keyframes } from '@/lib/emotion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Keyframes } from '@emotion/react';
import logos from '@/lib/logos';
import shuffle from 'shuffle-array';

type logo_name = (typeof logos)[number]['name'];
interface LogoCarouselProps {
	products: logo_name[];
	speed: number;
	className?: string;
	repeats?: 1 | 2 | 3 | 4;
	shuffle?: boolean;
}

export const LogoCarousel = (props: LogoCarouselProps) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = useState<Keyframes>(null);
	const [paused, setPaused] = useState<boolean>(false);
	const [dupe, setDupe] = useState<logo_name[]>([]);

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
	useEffect(() => {
		const shuffled = props.shuffle ? shuffle(props.products, { copy: true }) : props.products;
		setDupe(
			Array(props.repeats || 1)
				.fill(shuffled)
				.flat()
		);
	}, []);

	return (
		<div
			id='carouselParent'
			className={`${props.className} m-auto relative overflow-hidden h-10 py-12 box-content`}>
			<div
				id='animatedCarousel'
				ref={carouselRef}
				className='h-10 absolute gap-12 pr-12 start-0 flex justify-start items-center w-max'
				onMouseOver={() => setPaused(true)}
				onMouseOut={() => setPaused(false)}
				css={css({
					animation: `${scroll} ${props.speed * 2}s linear infinite`,
					animationPlayState: paused ? 'paused' : 'running',
				})}>
				{dupe.map((p, i) => {
					const entry = logos.find(l => l.name === p);
					return (
						<a
							target='_blank'
							className='h-full'
							key={`${p}-${i}`}
							data-tooltip-id='my-tooltip'
							data-tooltip-content={p}>
							<Image
								className='aspect-initial h-full w-auto lang-icon'
								src={entry.logo}
								alt={p + ' logo'}></Image>
						</a>
					);
				})}
			</div>
		</div>
	);
};

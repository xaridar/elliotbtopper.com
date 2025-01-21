'use client';

import Image from 'next/image';
import { css, keyframes } from '@/lib/emotion';
import { useEffect, useRef, useState } from 'react';
import { Keyframes } from '@emotion/react';
import logos, { logo_name } from '@/lib/logos';
import shuffle from 'shuffle-array';
import { ChevronDown, ChevronUp, Icon } from 'react-feather';
import Masonry from 'react-responsive-masonry';

interface LogoCarouselProps {
	products: logo_name[];
	speed: number;
	className?: string;
	repeats?: 1 | 2 | 3 | 4 | 5 | 6;
	shuffle?: boolean;
}

export const LogoCarousel = (props: LogoCarouselProps) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = useState<Keyframes>(null);
	const [paused, setPaused] = useState<boolean>(false);
	const [dupe, setDupe] = useState<logo_name[]>([]);
	const [scrollSpeed, setScrollSpeed] = useState<number>(0);
	const [anim, setAnim] = useState<string>('');
	const [showDetail, setShowDetail] = useState<boolean>(false);
	const [ShowIcon, setIcon] = useState<Icon>(ChevronDown);

	useEffect(() => {
		setIcon(showDetail ? ChevronUp : ChevronDown);
	}, [showDetail]);

	useEffect(() => {
		if (carouselRef.current != null) {
			setScroll(
				keyframes({
					from: { left: 0 },

					to: {
						left: `-${carouselRef.current.clientWidth / props.repeats}px;`,
					},
				})
			);
		}
	}, [carouselRef.current?.clientWidth, props.repeats, props.products]);

	useEffect(() => {
		const shuffled = props.shuffle ? shuffle(props.products, { copy: true }) : props.products;
		setDupe(
			Array(props.repeats || 1)
				.fill(shuffled)
				.flat()
		);
		setScrollSpeed(props.speed * props.products.length * (props.repeats || 1));
	}, [props.products, props.shuffle, props.repeats]);

	useEffect(() => {
		setAnim(`${scroll} ${scrollSpeed}s linear infinite`);
	}, [scroll, scrollSpeed]);

	return (
		<>
			<div
				id='carouselParent'
				className={`${props.className} m-auto relative overflow-hidden h-10 py-4 box-content`}>
				<div
					id='animatedCarousel'
					ref={carouselRef}
					className='h-10 absolute gap-12 pr-12 start-0 flex justify-start items-center w-max'
					onMouseOver={() => setPaused(true)}
					onMouseOut={() => setPaused(false)}
					css={css({
						animation: anim,
						animationPlayState: paused ? 'paused' : 'running',
					})}>
					{dupe.map((p, i) => {
						const entry = logos.find(l => l.name === p);
						// if (!entry) return;
						return (
							<span
								className='h-full'
								key={`${p}-${i}`}
								data-tooltip-id='my-tooltip'
								data-tooltip-content={p}>
								<Image
									className='aspect-initial h-full w-auto lang-icon'
									src={entry.logo}
									alt={p + ' logo'}></Image>
							</span>
						);
					})}
				</div>
			</div>
			<button onClick={() => setShowDetail(!showDetail)}>
				<ShowIcon className='m-auto' />
			</button>
			<div className={`${showDetail ? 'flex' : '!hidden'} flex-wrap gap-4 justify-around my-4 w-full`}>
				{props.products.sort().map((p, i) => {
					const entry = logos.find(l => l.name === p);
					if (!entry) return;
					return (
						<span
							className='w-auto'
							key={`${p}-${i}`}
							data-tooltip-id='my-tooltip'
							data-tooltip-content={p}>
							<Image
								className='aspect-initial h-8 w-auto lang-icon'
								src={entry.logo}
								alt={p + ' logo'}></Image>
						</span>
					);
				})}
			</div>
		</>
	);
};

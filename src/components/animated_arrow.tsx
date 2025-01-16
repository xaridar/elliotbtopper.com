'use client';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { css, keyframes } from '@/lib/emotion';
import { Button } from 'react-scroll';

export const AnimatedArrow = (props: { id: string }) => {
	return (
		<Button
			duration={800}
			smooth
			to={props.id}
			className='stroke-[rgb(var(--foreground-rgb))] absolute cursor-pointer'
			css={css({
				animation: `${keyframes({
					from: { bottom: '3rem' },
					to: { bottom: '1rem' },
				})} 1s ease-in-out infinite alternate`,
			})}
			size={80}>
			<ChevronDown size={80} />
		</Button>
	);
};

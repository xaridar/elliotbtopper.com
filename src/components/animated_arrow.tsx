'use client';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { css, keyframes } from '@/lib/emotion';

interface AnimArrowProps {
	color: string;
}

export const AnimatedArrow = (props: AnimArrowProps) => {
	return (
		<ChevronDown
			className='absolute -translate-x-1/2 cursor-pointer'
			css={css({
				animation: `${keyframes({
					from: { bottom: '3rem' },
					to: { bottom: '1rem' },
				})} 1s ease-in-out infinite alternate`,
			})}
			color={props.color}
			size={80}
		/>
	);
};

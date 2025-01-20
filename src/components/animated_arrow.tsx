'use client';

import { ChevronDown } from 'react-feather';
import { css, keyframes } from '@/lib/emotion';
import { Link } from 'react-scroll';

export const AnimatedArrow = (props: { id: string }) => {
	return (
		<Link
			duration={800}
			smooth
			to={props.id}
			as='a'
			className='stroke-[rgb(var(--foreground-rgb))] absolute left-1/2 -translate-x-1/2 cursor-pointer'
			css={css({
				animation: `${keyframes({
					from: { bottom: '3rem' },
					to: { bottom: '1rem' },
				})} 1s ease-in-out infinite alternate`,
			})}
			size={80}
			aria-label={props.id.charAt(0).toUpperCase() + props.id.substring(1)}>
			<ChevronDown size={80} />
		</Link>
	);
};

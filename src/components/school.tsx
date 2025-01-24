'use client';

import { SchoolInterface } from '@/models/School';
import { LogoCarousel } from './logo_carousel';
import Masonry from 'react-responsive-masonry';
import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@/lib/emotion';

export const School = (props: { school: SchoolInterface }) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [cols, setCols] = useState<number>(3);
	const [small, setSmall] = useState<boolean>(false);

	const handleResize = useCallback(() => {
		if (!cardRef.current) return;

		// md breakpoint
		if (window.innerWidth < 768) {
			if (cardRef.current.clientWidth < 410) {
				setSmall(true);
				return;
			} else if (cardRef.current.clientWidth < 550) setCols(3);
			else setCols(4);
			setSmall(false);
		} else {
			if (cardRef.current.clientWidth < 550) setCols(2);
			else if (cardRef.current.clientWidth < 730) setCols(3);
			else setCols(4);
			setSmall(false);
		}
	}, [cardRef.current]);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div
			className='card w-11/12 md:w-4/5 lg:w-3/5 p-4 md:p-8 m-8'
			ref={cardRef}>
			<h3 className='text-[2em] leading-normal my-4'>{props.school.school}</h3>
			<span>{props.school.degree}</span>
			<h4 className='mt-4'>Courses</h4>
			<div className='my-4 text-xs sm:text-sm'>
				<Masonry
					gutter='1rem'
					columnsCount={small ? 3 : cols}
					className='mb-8'>
					{Object.keys(props.school.courses).map((course, i) => (
						<div
							className='card shadow-none py-4 px-2 sm:px-4'
							key={`${props.school.school.replaceAll(/\s+/g, '-')}-course-${i}`}>
							<span className='font-bold'>{course}</span>
							{!small && `: ${props.school.courses[course]}`}
						</div>
					))}
				</Masonry>
			</div>
			<div
				className='box-content md:w-72 w-max card p-4 m-auto'
				css={css({ backgroundColor: 'rgba(var(--foreground-rgb),0.08) !important' })}>
				<span>Technologies Learned</span>
				<LogoCarousel
					products={props.school.technologies}
					speed={0.3}
					shuffle
					repeats={5}
					className='w-48 md:w-72'
				/>
			</div>
		</div>
	);
};

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Footer = () => {
	const [year, setYear] = useState<string>('');

	useEffect(() => {
		setYear(new Date().getFullYear().toString());
	}, []);

	return (
		<footer className='text-center absolute bottom-0 left-0 right-0 bg-[rgb(var(--foreground-rgb))] text-[rgb(var(--background-rgb))] py-2 px-3'>
			&copy;{' '}
			<Link
				target='_blank'
				href='https://www.github.com/xaridar'
				className='font-bold'>
				Elliot Topper
			</Link>{' '}
			<span>{year}</span>
		</footer>
	);
};

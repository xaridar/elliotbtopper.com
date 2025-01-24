'use client';

import { ProjectInterface } from '@/models/Project';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ProjectThumbnailProps {
	project: ProjectInterface;
	active: boolean;
	setSelected: () => void;
	setWidth: (width: number) => void;
}

export const ProjectThumbnail = (props: ProjectThumbnailProps) => {
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new ResizeObserver(() => {
			props.setWidth(ref.current?.clientWidth || 0);
		});
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref.current]);

	return (
		<button
			className={`${
				props.active ? 'bg-[rgba(0,0,0,0.75)]' : 'bg-transparent'
			} transition-[background-color] duration-500 whitespace-nowrap rounded-lg p-4 cursor-pointer flex flex-col items-center`}
			onClick={() => {
				props.setSelected();
			}}
			ref={ref}
			aria-label={`View ${props.project.title}`}>
			<Image
				src={`/images/${props.project.image_link}`}
				alt={`Screenshot of ${props.project.title}`}
				height={600}
				width={600}
				className='max-w-none h-32 w-auto mb-2'
			/>
			<h4 className={`${props.active ? 'text-[rgb(var(--background-rgb))]' : ''} transition-color`}>
				{props.project.title}
			</h4>
		</button>
	);
};

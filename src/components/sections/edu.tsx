import { useEffect, useState } from 'react';
import { LogoCarousel } from '../logo_carousel';
import { SchoolInterface } from '@/models/School';
import { School } from '../school';
import { BG } from '../moving_background';
import { AnimatedArrow } from '../animated_arrow';

export const Education = () => {
	const [edu, setEdu] = useState<SchoolInterface[]>([]);

	useEffect(() => {
		const getProjects = async () => {
			const json = await (await fetch('/api/education')).json();
			if ('error' in json) {
				console.error(json.error);
				return;
			}
			const conv = json as SchoolInterface[];
			setEdu(conv);
		};
		getProjects();
	}, []);

	return (
		<BG
			baseElement='section'
			secondaryColor='black'
			id='education'
			className='min-h-screen text-center pt-12 md:pt-24 colored flex items-center flex-col pb-36'>
			<h2 className='text-[4em] leading-normal'>Education</h2>
			<div className='m-8 w-full flex flex-col items-center'>
				{edu.map(c => {
					return (
						<School
							school={c}
							key={`${c.id}`}
						/>
					);
				})}{' '}
			</div>
			<AnimatedArrow id='contact' />
		</BG>
	);
};

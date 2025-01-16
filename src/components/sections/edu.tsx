import { useEffect, useState } from 'react';
import { LogoCarousel } from '../logo_carousel';
import { SchoolInterface } from '@/models/School';
import { School } from '../school';
import { BG } from '../moving_background';

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
			console.log(conv);
			setEdu(conv);
		};
		getProjects();
	}, []);

	return (
		<BG
			baseElement='section'
			secondaryColor='black'
			id='education'
			className='h-screen text-center pt-28 colored'>
			<h2 className='text-6xl'>Education</h2>
			{edu.map(c => {
				return (
					<School
						school={c}
						key={`${c.id}`}
					/>
				);
			})}
		</BG>
	);
};

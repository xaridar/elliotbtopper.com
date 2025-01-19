import { SchoolInterface } from '@/models/School';
import { LogoCarousel } from './logo_carousel';

export const School = (props: { school: SchoolInterface }) => {
	return (
		<div className='card w-11/12 md:w-3/5 p-4 md:p-8 m-8'>
			<h3 className='text-[2em] leading-normal my-4'>{props.school.school}</h3>
			<span>{props.school.degree}</span>
			<div className='my-4 text-sm'>
				{props.school.involvements.map((inv, i) => (
					<p key={`${props.school.school.replaceAll(/\s+/g, '-')}-inv-${i}`}>{inv}</p>
				))}
			</div>
			<LogoCarousel
				products={props.school.technologies}
				speed={0.3}
				shuffle
				repeats={5}
				className='w-48 md:w-72'
			/>
		</div>
	);
};

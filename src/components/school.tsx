import { SchoolInterface } from '@/models/School';
import { LogoCarousel } from './logo_carousel';

export const School = (props: { school: SchoolInterface }) => {
	return (
		<div>
			<h3>{props.school.school}</h3>
			<LogoCarousel
				products={props.school.technologies}
				speed={0.3}
				shuffle
				repeats={5}
				className='w-72'
			/>
		</div>
	);
};

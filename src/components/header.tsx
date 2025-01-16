import { Button } from 'react-scroll';

export const Header = () => {
	return (
		<header className='fixed w-full pt-4 z-10 pointer-events-none'>
			<ul className='flex justify-around pointer-events-auto max-w-2xl w-3/5 m-auto py-6 rounded-full bg-[rgba(0,0,0,0.75)] text-white'>
				<li className='cursor-pointer hover:scale-110 hover:text-[rgb(var(--accent-rgb))] transition-all'>
					<Button
						to='home'
						smooth={true}
						duration={800}>
						Home
					</Button>
				</li>
				<li className='cursor-pointer hover:scale-110 hover:text-[rgb(var(--accent-rgb))] transition-all'>
					<Button
						to='projects'
						smooth={true}
						duration={800}>
						Projects
					</Button>
				</li>
				<li className='cursor-pointer hover:scale-110 hover:text-[rgb(var(--accent-rgb))] transition-all'>
					<Button
						to='education'
						smooth={true}
						duration={800}>
						Education
					</Button>
				</li>
				<li>Contact</li>
				<li>Resume</li>
			</ul>
		</header>
	);
};

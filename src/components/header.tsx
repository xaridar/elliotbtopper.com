'use client';

import { Button } from 'react-scroll';
import { useEffect, useState } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import Link from 'next/link';
import { css } from '@/lib/emotion';

export const Header = (props: { active: 'home' | 'projects' | 'education' | 'contact' }) => {
	const [mobileOpened, setMobileOpened] = useState<boolean>(false);

	useEffect(() => {
		const listener = e => {
			if (e.code === 'Escape') {
				setMobileOpened(false);
			}
		};
		window.addEventListener('keydown', listener);
		return () => window.removeEventListener('keydown', listener);
	}, []);

	useEffect(() => {
		document.body.style.overflowY = mobileOpened ? 'hidden' : 'visible';
	}, [mobileOpened]);

	return (
		<header className='fixed w-full pt-4 z-10 pointer-events-none'>
			<ul className='justify-around pointer-events-auto max-w-2xl w-2/3 m-auto py-6 rounded-full bg-[rgba(0,0,0,0.75)] text-white hidden md:flex'>
				<li
					className={`cursor-pointer hover:scale-125 hover:text-[rgb(var(--accent-rgb))] transition-all ${
						props.active === 'home' && 'text-[rgb(var(--accent-rgb))]'
					}`}>
					<Button
						to='home'
						smooth={true}
						duration={800}>
						Home
					</Button>
				</li>
				<li
					className={`cursor-pointer hover:scale-125 hover:text-[rgb(var(--accent-rgb))] transition-all ${
						props.active === 'projects' && 'text-[rgb(var(--accent-rgb))]'
					}`}>
					<Button
						to='projects'
						smooth={true}
						duration={800}>
						Projects
					</Button>
				</li>
				<li
					className={`cursor-pointer hover:scale-125 hover:text-[rgb(var(--accent-rgb))] transition-all ${
						props.active === 'education' && 'text-[rgb(var(--accent-rgb))]'
					}`}>
					<Button
						to='education'
						smooth={true}
						duration={800}>
						Education
					</Button>
				</li>
				<li
					className={`cursor-pointer hover:scale-125 hover:text-[rgb(var(--accent-rgb))] transition-all ${
						props.active === 'contact' && 'text-[rgb(var(--accent-rgb))]'
					}`}>
					<Button
						to='contact'
						smooth={true}
						duration={800}>
						Contact
					</Button>
				</li>
				<li className='cursor-pointer hover:scale-125 transition-all text-[rgb(var(--link-rgb))]'>
					<Link
						target='_blank'
						href='/resume.pdf'>
						Resume
					</Link>
				</li>
			</ul>
			<div className='flex md:hidden bg-[rgba(0,0,0,0.75)] text-white fixed top-0 right-0 aspect-square rounded-es-full box-border pointer-events-auto items-center justify-center'>
				<button
					className='p-8 pr-4 pt-4 rounded-es-full z-10 aspect-square'
					onClick={() => setMobileOpened(!mobileOpened)}>
					<HamburgerMenu
						width={24}
						height={18}
						isOpen={mobileOpened}
						menuClicked={() => setMobileOpened(!mobileOpened)}
						color='currentColor'
					/>
				</button>
				{mobileOpened && (
					<div className='fixed inset-0 bg-black'>
						<ul className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-around h-4/5 text-4xl'>
							<li
								css={css({ animation: 'fade-in 450ms 0ms forwards' })}
								className='opacity-0 cursor-pointer transition-scale hover:text-[rgb(var(--accent-rgb))] transition-all'>
								<Button
									to='home'
									onClick={() => setMobileOpened(false)}
									smooth={true}
									duration={800}>
									Home
								</Button>
							</li>
							<li
								css={css({ animation: 'fade-in 450ms 200ms forwards' })}
								className='opacity-0 cursor-pointer transition-scale hover:text-[rgb(var(--accent-rgb))] transition-all'>
								<Button
									to='projects'
									onClick={() => setMobileOpened(false)}
									smooth={true}
									duration={800}>
									Projects
								</Button>
							</li>
							<li
								css={css({ animation: 'fade-in 450ms 400ms forwards' })}
								className='opacity-0 cursor-pointer transition-scale hover:text-[rgb(var(--accent-rgb))] transition-all'>
								<Button
									to='education'
									onClick={() => setMobileOpened(false)}
									smooth={true}
									duration={800}>
									Education
								</Button>
							</li>
							<li
								css={css({ animation: 'fade-in 450ms 600ms forwards' })}
								className='opacity-0 cursor-pointer transition-scale hover:text-[rgb(var(--accent-rgb))] transition-all'>
								<Button
									to='contact'
									onClick={() => setMobileOpened(false)}
									smooth={true}
									duration={800}>
									Contact
								</Button>
							</li>
							<li
								css={css({ animation: 'fade-in 450ms 800ms forwards' })}
								className='opacity-0 cursor-pointer transition-scale transition-all text-[rgb(var(--link-rgb))]'>
								<Link
									target='_blank'
									onClick={() => setMobileOpened(false)}
									href='/resume.pdf'>
									Resume
								</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</header>
	);
};

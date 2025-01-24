/* @jsxImportSource react */
'use client';

import { Tooltip } from 'react-tooltip';
import { Header } from '@/components/header';
import { HomeElem } from '@/components/sections/home';
import { Projects } from '@/components/sections/projects';
import { Education } from '@/components/sections/edu';
import { Contact } from '@/components/sections/contact';
import { FormspreeProvider } from '@formspree/react';
import { Footer } from '@/components/footer';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Home() {
	useEffect(() => {
		// favicon animation
		setInterval(function () {
			(document.querySelector('link[rel="icon"]') as HTMLLinkElement).href = '/favicon.ico';
			setTimeout(function () {
				(document.querySelector('link[rel="icon"]') as HTMLLinkElement).href = '/favicon2.ico';
			}, 750);
		}, 1500);
	}, []);

	const [activePage, setActivePage] = useState<'home' | 'projects' | 'education' | 'contact'>('home');

	const homeRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);
	const educationRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);

	const handleScroll = useCallback(() => {
		if (!homeRef.current || !projectsRef.current || !educationRef.current || !contactRef.current) return;
		const prop = window.innerHeight / 3;
		const projectsDist = projectsRef.current.offsetTop - window.scrollY;
		const educationDist = educationRef.current.offsetTop - window.scrollY;
		const contactDist = contactRef.current.offsetTop - window.scrollY;

		if (projectsDist > prop) {
			setActivePage('home');
			return;
		}
		if (educationDist > prop) {
			setActivePage('projects');
			return;
		}
		if (contactDist > prop) {
			setActivePage('education');
			return;
		}
		setActivePage('contact');
	}, [homeRef.current, projectsRef.current, educationRef.current, contactRef.current]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	return (
		<FormspreeProvider project={process.env.FORMSPREE_PROJECT_ID}>
			<div className='text-xs sm:text-sm md:text-lg relative'>
				<Tooltip
					id='my-tooltip'
					style={{ zIndex: 99 }}
				/>
				<Header active={activePage} />
				<HomeElem ref={homeRef} />
				<Projects ref={projectsRef} />
				<Education ref={educationRef} />
				<Contact ref={contactRef} />
				<Footer />
			</div>
		</FormspreeProvider>
	);
}

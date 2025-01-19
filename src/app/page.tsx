/* @jsxImportSource react */
'use client';

import { Tooltip } from 'react-tooltip';
import { Header } from '@/components/header';
import { HomeElem } from '@/components/sections/home';
import { Projects } from '@/components/sections/projects';
import { Education } from '@/components/sections/edu';
import { Contact } from '@/components/sections/contact';
import { FormspreeProvider } from '@formspree/react';

export default function Home() {
	return (
		<FormspreeProvider project={process.env.FORMSPREE_PROJECT_ID}>
			<div className='text-xs sm:text-sm md:text-lg'>
				<Tooltip
					id='my-tooltip'
					style={{ zIndex: 99 }}
				/>
				<Header />
				<HomeElem />
				<Projects />
				<Education />
				<Contact />
			</div>
		</FormspreeProvider>
	);
}

/* @jsxImportSource react */
'use client';

import { Tooltip } from 'react-tooltip';
import { Header } from '@/components/header';
import { HomeElem } from '@/components/sections/home';
import { Projects } from '@/components/sections/projects';
import { Education } from '@/components/sections/edu';

export default function Home() {
	return (
		<div>
			<Tooltip
				id='my-tooltip'
				style={{ zIndex: 99 }}
			/>
			<Header />
			<HomeElem />
			<Projects />
			<Education />
		</div>
	);
}

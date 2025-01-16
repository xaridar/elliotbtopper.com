import { useCallback, useEffect, useState } from 'react';
import { LogoCarousel } from '../logo_carousel';
import { ProjectInterface } from '@/models/Project';
import { ProjectThumbnail } from '../project_thumbnail';
import { BG } from '../moving_background';
import { AnimatedArrow } from '../animated_arrow';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'react-feather';

export const Projects = () => {
	const [projects, setProjects] = useState<ProjectInterface[]>([]);
	const [activeProject, setActiveProject] = useState<string>('');
	const [selectedProject, setSelectedProject] = useState<ProjectInterface>(null);
	const [canKeyHit, setCanKeyHit] = useState<boolean>(true);

	useEffect(() => {
		const getProjects = async () => {
			const json = await (await fetch('/api/projects')).json();
			if ('error' in json) {
				console.error(json.error);
				return;
			}
			const conv = json as ProjectInterface[];
			setProjects(conv);
		};
		getProjects();
	}, []);

	const decrement = useCallback(() => {
		if (!canKeyHit) return;
		const id = selectedProject?._id;
		const pos = id ? projects.findIndex(val => val._id === id) : 0;
		const newPos = (pos - 1 + projects.length) % projects.length;
		setActiveProject(`${projects[newPos]._id}`);
		setSelectedProject(projects[newPos]);
		setCanKeyHit(false);
		setTimeout(() => {
			setCanKeyHit(true);
		}, 100);
	}, [activeProject, selectedProject, setActiveProject, setSelectedProject, projects, canKeyHit]);

	const increment = useCallback(() => {
		if (!canKeyHit) return;
		const id = selectedProject?._id;
		const pos = id ? projects.findIndex(val => val._id === id) : -1;
		const newPos = (pos + 1) % projects.length;
		setActiveProject(`${projects[newPos]._id}`);
		setSelectedProject(projects[newPos]);
		setCanKeyHit(false);
		setTimeout(() => {
			setCanKeyHit(true);
		}, 100);
	}, [activeProject, selectedProject, setActiveProject, setSelectedProject, projects, canKeyHit]);

	useEffect(() => {
		const el = function (e) {
			if (e.code === 'ArrowLeft') {
				decrement();
			} else if (e.code === 'ArrowRight') {
				increment();
			}
		};
		window.addEventListener('keydown', el);
		return () => window.removeEventListener('keydown', el);
	}, [decrement, increment]);

	return (
		<BG
			baseElement='section'
			secondaryColor='rgb(var(--accent-rgb))'
			id='projects'
			className='min-h-screen flex items-center flex-col text-center pt-28 pb-36'>
			<h2 className='text-6xl'>Projects</h2>
			<div className='m-8 h-24 max-w-4xl w-4/5 flex justify-center items-center'>
				<button onClick={decrement}>
					<ChevronLeft className='m-2' />
				</button>
				<div className='h-full w-full rounded-lg overflow-hidden flex justify-center items-center'>
					{projects.map(c => {
						return (
							<ProjectThumbnail
								project={c}
								id={`${c._id}`}
								active={activeProject === c._id}
								setActive={setActiveProject}
								key={`${c._id}`}
								setSelected={setSelectedProject}
							/>
						);
					})}
				</div>
				<button onClick={increment}>
					<ChevronRight className='m-2' />
				</button>
			</div>
			{selectedProject && (
				<div className='!text-inherit flex items-center justify-center flex-col gap-8 m-8 w-3/5 card p-8'>
					<Link
						target='_blank'
						href={selectedProject.link}>
						<h3 className='text-3xl'>{selectedProject.title}</h3>
					</Link>
					<Image
						className='h-48 w-auto'
						src={`/images/${selectedProject.image_link}`}
						alt={''}
						width={1000}
						height={1000}
					/>
					<p>
						{selectedProject.description.split(/(\[.*?\]\(.*?\))/g).map((elem, i) =>
							i % 2 == 0 ? (
								<span key={i}>{elem}</span>
							) : i % 2 == 1 ? (
								<Link
									key={i}
									target='_blank'
									href={elem.split(/\((.*?)\)/)[1]}>
									{elem.split(/\[(.*?)\]/)[1]}
								</Link>
							) : (
								<></>
							)
						)}
					</p>
					<div className='rounded-md bg-[rgba(var(--foreground-rgb),0.3)] p-4'>
						<span>Technologies Used</span>
						<LogoCarousel
							products={selectedProject.technologies}
							speed={0.3}
							shuffle
							repeats={5}
							className='w-72'
						/>
					</div>
				</div>
			)}
			<AnimatedArrow id={'education'} />
		</BG>
	);
};

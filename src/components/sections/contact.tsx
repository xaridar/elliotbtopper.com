import { GitHub, Linkedin, Mail } from 'react-feather';
import { BG } from '../moving_background';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useForm as useFormspree } from '@formspree/react';
import { RefObject } from 'react';

export const Contact = (props: { ref: RefObject<HTMLDivElement> }) => {
	const {
		register,
		handleSubmit,
		clearErrors,
		reset,
		formState: { errors, isSubmitted },
	} = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

	const [state, fsSubmit] = useFormspree('mbllvaoy');

	return (
		<BG
			baseElement='section'
			secondaryColor='rgb(var(--accent-rgb))'
			id='contact'
			ref={props.ref}
			className='min-h-screen flex items-center flex-col text-center pt-12 md:pt-24'>
			<h2 className='text-[4em] leading-normal'>Contact</h2>
			<div className='flex flex-col items-center justify-between h-3/4 mt-8 gap-4 w-4/5'>
				<form
					className='w-full'
					onSubmit={handleSubmit(async data => {
						await fsSubmit(data);
						reset();
					})}>
					<h3 className='text-xl'>Feel free to reach out with any questions or inquiries!</h3>
					{state.succeeded && <span>Thanks for reaching out! I'll get back to you soon!</span>}
					<div className='mt-8 flex flex-wrap gap-4'>
						<div className='flex-1 min-w-32'>
							<div className='flex gap-2 mb-1'>
								<input
									{...register('name', {
										required: 'Name is required',
									})}
									placeholder='Name'
									type='text'
									onInput={() => clearErrors('name')}
									className={`w-full p-4 rounded-lg ${
										errors.name && isSubmitted && 'outline outline-red-800 outline-2'
									}`}></input>
								<span className='text-red-800 text-xl'>*</span>
							</div>
							<span className='text-red-800'>{errors.name?.message.toString()}</span>
						</div>
						<div className='flex-1 min-w-32'>
							<div className='flex gap-2 mb-1'>
								<input
									{...register('email', {
										required: 'Email is required',
										pattern: {
											value: /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/i,
											message: 'Invalid email',
										},
									})}
									placeholder='Email'
									onInput={() => clearErrors('email')}
									className={`w-full p-4 rounded-lg ${
										errors.email && isSubmitted && 'outline outline-red-800 outline-2'
									}`}></input>
								<span className='text-red-800 text-xl'>*</span>
							</div>
							<span className='text-red-800'>{errors.email?.message.toString()}</span>
						</div>
					</div>
					<div className='mt-4 mb-2'>
						<div className='flex gap-2 mb-1'>
							<textarea
								{...register('message', {
									required: 'Message is required',
								})}
								placeholder='Message'
								onInput={() => clearErrors('message')}
								className={`w-full p-4 rounded-lg md:h-48 ${
									errors.message && isSubmitted && 'outline outline-red-800 outline-2'
								}`}></textarea>
							<span className='text-red-800 text-xl'>*</span>
						</div>
						<span className='text-red-800'>{errors.message?.message.toString()}</span>
					</div>
					<br />
					<button
						className='mb-8 rounded-full border-2 border-current px-12 py-4 hover:scale-110 transition-all disabled:text-gray-500 disabled:border-gray-500'
						type='submit'
						disabled={state.submitting}>
						Send
					</button>
				</form>
				<div className='mb-12 flex flex-wrap gap-8 items-center justify-center mt-8'>
					<Link
						aria-label='Email'
						className='hover:scale-125 transition-all hover:text-red-800'
						href='mailto:elliotbtopper@gmail.com'
						target='_blank'>
						<Mail size={35} />
					</Link>
					<Link
						aria-label='GitHub'
						className='hover:scale-125 transition-all hover:text-black'
						href='https://github.com/xaridar'
						target='_blank'>
						<GitHub size={35} />
					</Link>
					<Link
						aria-label='LinkedIn'
						className='hover:scale-125 transition-all hover:text-blue-800'
						href='https://www.linkedin.com/in/elliot-topper'
						target='_blank'>
						<Linkedin size={35} />
					</Link>
				</div>
			</div>
		</BG>
	);
};

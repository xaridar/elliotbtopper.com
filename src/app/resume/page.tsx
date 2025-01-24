'use server';

import { redirect } from 'next/navigation';

export default async function Resume() {
	redirect(`/api/resume`);
}

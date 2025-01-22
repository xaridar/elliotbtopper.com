import { createWriteStream } from 'fs';

export const GET = async req => {
	try {
		const resume = await fetch(
			'https://docs.google.com/document/d/14XQklBLNCSaWzIjvyNgUTdRAQC51siIFKxPDNgHU6gM/export?format=pdf'
		);
		if (!resume.ok)
			return new Response(JSON.stringify({ status: 'not-found' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		const file = await resume.blob();
		const ab = await file.arrayBuffer();
		const buf = Buffer.from(ab);
		await new Promise<void>((res, rej) => createWriteStream('public/resume.pdf').write(buf, () => res()));
		return new Response(JSON.stringify({ status: 'ok' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ status: 'not-found' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

import { readFile } from 'fs/promises';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import path from 'path';

export const GET = async req => {
	try {
		const resume = await fetch(`https://docs.google.com/document/d/${process.env.RESUME_ID}/export?format=pdf`);
		if (!resume.ok)
			return new Response(JSON.stringify({ status: 'not-found' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		const file = await resume.blob();
		const ab = await file.arrayBuffer();

		return new Response(ab, {
			status: 200,
			headers: { 'Content-Type': 'application/pdf', 'Content-Length': `${ab.byteLength}` },
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ status: 'not-found' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

import { readFile } from 'fs/promises';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import path from 'path';

export const GET = async req => {
	try {
		const resume = await fetch(`https://docs.google.com/document/d/${process.env.RESUME_ID}/export?format=pdf`);
		if (!resume.ok)
			return new Response(JSON.stringify({ status: 'not-found', resume }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		const file = await resume.blob();
		const ab = await file.arrayBuffer();
		const pdfDoc = await PDFDocument.load(ab);
		pdfDoc.registerFontkit(fontkit);
		const page = pdfDoc.getPages()[0];

		const { width, height } = page.getSize();

		page.drawRectangle({ x: width - 220, y: height - 65, width: 100, height: 15, color: rgb(1, 1, 1) });
		const fontBytes = await readFile(path.join(process.cwd(), 'Gelasio-VariableFont_wght.ttf'));
		const customFont = await pdfDoc.embedFont(new Uint8Array(fontBytes));

		page.drawText('(***)-***-****', {
			x: width - 215,
			y: height - 62,
			size: 10,
			color: rgb(0, 0, 0),
			font: customFont,
		});
		const newBytes = await pdfDoc.save();
		const buf = Buffer.from(newBytes.buffer);
		const len = buf.length;

		return new Response(buf, {
			status: 200,
			headers: { 'Content-Type': 'application/pdf', 'Content-Length': `${len}` },
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ status: 'not-found', error }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

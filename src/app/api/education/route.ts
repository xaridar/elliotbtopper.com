import run from '@/lib/mongoose';
import School from '@/models/School';

export const GET = async req => {
	await run();
	try {
		const edu = await School.find({}).lean().sort({ year_started: 'desc' });
		return new Response(JSON.stringify(edu), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Education could not be retrieved.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

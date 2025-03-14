import run from '@/lib/mongoose';
import Project from '@/models/Project';

export const GET = async req => {
	await run();
	try {
		const projects = await Project.find({}).sort({ year: 'desc' }).lean();
		return new Response(JSON.stringify(projects), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Projects could not be retrieved.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

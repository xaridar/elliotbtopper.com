import logos, { logo_name } from '@/lib/logos';
import mongoose from 'mongoose';

interface TypedInterface extends mongoose.Document {
	school: String;
	degree: String;
	gpa: Number;
	involvements: String;
	technologies: logo_name[];
}

const SchoolSchema = new mongoose.Schema<TypedInterface>({
	school: { type: String, required: true },
	degree: { type: String, required: true },
	gpa: { type: Number, required: false },
	involvements: [{ type: String }],
	technologies: [{ type: String, enum: Object.values(logos.map(l => l.name)) }],
});

export default mongoose.models.School || mongoose.model('School', SchoolSchema, 'education');

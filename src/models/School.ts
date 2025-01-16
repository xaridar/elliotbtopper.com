import logos, { logo_name } from '@/lib/logos';
import mongoose from 'mongoose';

export interface SchoolInterface extends mongoose.Document {
	school: string;
	degree: string;
	gpa: number;
	involvements: string[];
	year_started: number;
	technologies: logo_name[];
}

const SchoolSchema = new mongoose.Schema<SchoolInterface>({
	school: { type: String, required: true },
	degree: { type: String, required: true },
	gpa: { type: Number, required: false },
	involvements: [{ type: String }],
	year_started: { type: Number, required: true },
	technologies: [{ type: String, enum: Object.values(logos.map(l => l.name)) }],
});

const model = mongoose.models.School || mongoose.model<SchoolInterface>('School', SchoolSchema, 'education');

export default model;

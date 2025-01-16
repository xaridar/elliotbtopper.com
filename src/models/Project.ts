import logos, { logo_name } from '@/lib/logos';
import mongoose from 'mongoose';

export interface ProjectInterface extends mongoose.Document {
	title: string;
	description: string;
	image_link: string;
	link: string;
	technologies: logo_name[];
	year: number;
	for?: string;
}

const ProjectSchema = new mongoose.Schema<ProjectInterface>({
	title: { type: String, required: true, unique: true, index: true },
	description: { type: String, required: true },
	image_link: { type: String, required: true, match: /[A-Za-z_-]+.(png|jpg|jpeg|webp|tiff)/ },
	link: { type: String },
	technologies: [{ type: String, enum: Object.values(logos.map(l => l.name)) }],
	year: { type: Number, required: true },
	for: { type: String, required: false },
});

const model = mongoose.models.Project || mongoose.model<ProjectInterface>('Project', ProjectSchema);

export default model;

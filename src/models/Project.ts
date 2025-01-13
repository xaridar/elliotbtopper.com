import logos, { logo_name } from '@/lib/logos';
import mongoose from 'mongoose';

interface TypedInterface extends mongoose.Document {
	title: String;
	description: String;
	image_link: String;
	link: String;
	technologies: logo_name[];
	for: String;
}

const ProjectSchema = new mongoose.Schema<TypedInterface>({
	title: { type: String, required: true, unique: true, index: true },
	description: { type: String, required: true },
	image_link: { type: String, required: true, match: /[A-Za-z_-]+.(png|jpg|jpeg|webp|tiff)/ },
	link: { type: String },
	technologies: [{ type: String, enum: Object.values(logos.map(l => l.name)) }],
	for: { type: String, required: false },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

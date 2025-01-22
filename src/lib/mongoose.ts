import mongoose, { ConnectOptions } from 'mongoose';

const uri = process.env.MONGODB_URI;
const clientOptions: ConnectOptions = {
	serverApi: { version: '1', strict: true, deprecationErrors: true },
	dbName: 'Portfolio',
};

if (!uri) {
	throw new Error('Please add your MongoDB URI to .env.local');
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const run = async () => {
	try {
		if (cached.conn) {
			return cached.conn;
		}

		if (!cached.promise) {
			cached.promise = mongoose
				.connect(uri, clientOptions)
				.then(() => console.log('Connected to MongoDB!'))
				.then(mongoose => mongoose);
		}

		cached.conn = await cached.promise;
		global.mongoose = cached;
	} catch (error) {
		await mongoose.disconnect();
	}
	return cached.conn;
};

export default run;

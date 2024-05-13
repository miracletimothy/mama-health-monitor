import mongoose, { Schema, Document } from 'mongoose';

// Define interface for user document
interface UserDocument extends Document {
	name: string;
	email: string;
	password: string;
	role?: 'SystemAdmin' | 'HealthWorker' | 'PregnantWoman'; // Optional role field
}

const userSchema: Schema<UserDocument> = new mongoose.Schema<UserDocument>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['SystemAdmin', 'HealthWorker', 'PregnantWoman'],
	},
});

export const User = mongoose.model<UserDocument>('User', userSchema);

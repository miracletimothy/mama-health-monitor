import mongoose, { Schema, Document, Types } from 'mongoose';

enum ContentType {
	Document = 'document',
	Image = 'image',
	Video = 'video',
	Audio = 'audio',
}

export interface ContentDocument extends Document {
	title: string;
	description: string;
	type: ContentType;
	fileSize: number;
	filePath: string;
	fileUrl: string;
	uploader: string; // Reference to user
	createdAt: Date;
}
const contentSchema: Schema<ContentDocument> = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: Object.values(ContentType),
		required: true,
	},
	fileSize: {
		type: Number,
		required: true,
	},
	filePath: {
		type: String,
		required: true,
	},
	fileUrl: {
		type: String,
		required: true,
	},
	uploader: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
export const Content = mongoose.model<ContentDocument>(
	'Content',
	contentSchema,
);

export interface CategoryDocument extends Document {
	name: string;
	description: string;
	parentCategory?: Types.ObjectId;
	createdAt: Date;
}
const categorySchema: Schema<CategoryDocument> =
	new mongoose.Schema<CategoryDocument>({
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		parentCategory: {
			type: Types.ObjectId,
			ref: 'Category',
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	});
export const Category = mongoose.model<CategoryDocument>(
	'Category',
	categorySchema,
);

export interface TagDocument extends Document {
	name: string;
	description: string;
	createdAt: Date;
}
const tagSchema: Schema<TagDocument> = new mongoose.Schema<TagDocument>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
export const Tag = mongoose.model<TagDocument>('Tag', tagSchema);

export interface CommentDocument extends Document {
	content: string;
	author?: Types.ObjectId;
	createdAt: Date;
}
const commentSchema: Schema<CommentDocument> =
	new mongoose.Schema<CommentDocument>({
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	});
export const Comment = mongoose.model<CommentDocument>(
	'Comment',
	commentSchema,
);

export interface LikeDocument extends Document {
	contentId?: Types.ObjectId;
	userId?: Types.ObjectId;
	createdAt: Date;
}
const likeSchema: Schema<LikeDocument> = new mongoose.Schema<LikeDocument>({
	contentId: {
		type: Types.ObjectId,
		ref: 'Content',
		required: true,
	},
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
export const Like = mongoose.model<LikeDocument>('Like', likeSchema);

export interface BookmarkDocument extends Document {
	contentId?: Types.ObjectId;
	userId?: Types.ObjectId;
	createdAt: Date;
}
const bookmarkSchema: Schema<BookmarkDocument> =
	new mongoose.Schema<BookmarkDocument>({
		contentId: {
			type: Types.ObjectId,
			ref: 'Content',
			required: true,
		},
		userId: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	});
export const Bookmark = mongoose.model<BookmarkDocument>(
	'Bookmark',
	bookmarkSchema,
);

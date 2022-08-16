/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		cover: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		/*
		category is blog or tips
	*/
		seoTitle: {
			type: String,
			required: true,
			default: null
		},
		seoDescription: {
			type: String,
			required: true,
			default: null
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = (registry) => {
	registry.Blog = Blog;
};

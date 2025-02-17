import mongoose from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    content: { type: String, required: [true, 'Content is required'] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;

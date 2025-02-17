import { z } from 'zod';

const blogSchema = z.object({
  title: z.string({ required_error: 'title is required' }),
  content: z.string({ required_error: 'content is required' }),
});
const updateBlogSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const blogValidation = { blogSchema, updateBlogSchema };

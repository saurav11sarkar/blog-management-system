import User from '../user/user.model';
import { IBlog } from './blog.interface';
import Blog from './blog.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { Request } from 'express';
import QueryBuilder from '../../builder/queryBuilder';

const createBlog = async (req: Request) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('You are not authorized');
  const tokenString = token.split(' ')[1];

  const decode = jwt.verify(
    tokenString,
    config.jwtSecret as string,
  ) as JwtPayload;
  const { _id } = decode;

  const user = await User.findById(_id);
  if (!user) throw new Error('User not found');

  // Ensure the blog author is the authenticated user
  const blogData: IBlog = { ...req.body, author: _id };

  const blog = await (await Blog.create(blogData)).populate('author');
  return blog;
};

const getAllBlogs = async (payload: Record<string, unknown>) => {
  const searchFiled = ['title', 'content'];
  const query = new QueryBuilder(Blog.find(), payload)
    .search(searchFiled)
    .sort()
    .filter();
  const result = await query.modelQuery;
  return result;
};

const getBlogById = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlog = async (
  req: Request,
  id: string,
  payload: Partial<IBlog>,
) => {
  const token = req.headers?.authorization;
  if (!token) throw new Error('You are not authorized');
  const tokenString = token.split(' ')[1];

  const decode = jwt.verify(
    tokenString,
    config.jwtSecret as string,
  ) as JwtPayload;
  const { _id } = decode;

  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');

  // Ensure the blog belongs to the authenticated user
  if (blog.author.toString() !== _id)
    throw new Error('You can only update your own blog');

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlog = async (req: Request, id: string) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('You are not authorized');
  const tokenString = token.split(' ')[1];

  const decode = jwt.verify(
    tokenString,
    config.jwtSecret as string,
  ) as JwtPayload;
  const { _id } = decode;

  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');

  // Ensure the blog belongs to the authenticated user
  if (blog.author.toString() !== _id)
    throw new Error('You can only delete your own blog');

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

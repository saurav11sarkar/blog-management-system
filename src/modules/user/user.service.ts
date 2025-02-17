import User from './user.model';
import { IUser } from './user.interface';
import Blog from '../blog/blog.model';

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const getUser = async () => {
  const result = await User.find();
  return result;
};

const getUserById = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const blockUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  if (user.isBlocked) throw new Error('User already blocked');
  user.isBlocked = true;
  const result = await User.findByIdAndUpdate(id, user, { new: true });
  return result;
};

const deleteBlog = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');
  if (blog.isPublished === false) throw new Error('Blog is not published');

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const userService = {
  blockUser,
  createUser,
  getUser,
  getUserById,
  deleteBlog,
};

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespons';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const blog = await blogService.createBlog(req); // Pass req instead of req.body
  sendResponse(res, 201, 'Blog created successfully', blog);
});

const getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getAllBlogs(req.query);
  sendResponse(res, 200, 'Blogs fetched successfully', blogs);
});

const getBlogById = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) throw new Error('Blog not found');
  sendResponse(res, 200, 'Blog fetched successfully', blog);
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogService.updateBlog(req, req.params.id, req.body);
  sendResponse(res, 200, 'Blog updated successfully', blog);
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlog(req, req.params.id);
  sendResponse(res, 200, 'Blog deleted successfully', null);
});

export const blogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

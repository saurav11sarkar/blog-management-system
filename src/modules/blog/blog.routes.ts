import express from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { blogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  requestValidation(blogValidation.blogSchema),
  blogController.createBlog,
);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.patch(
  '/:id',
  auth('user'),
  requestValidation(blogValidation.updateBlogSchema),
  blogController.updateBlog,
);
router.delete('/:id', auth('user'), blogController.deleteBlog);

export const blogRoutes = router;

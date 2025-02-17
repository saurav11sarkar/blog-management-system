import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { blogRoutes } from '../modules/blog/blog.routes';
import { userRouter } from '../modules/user/user.routes';
const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/blogs', blogRoutes);
router.use('/admin', userRouter);

export default router;

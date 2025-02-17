import express from 'express';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';
import requestValidation from '../../middlewares/requestValidation';
import { userValidation } from './user.validation';
const router = express.Router();

router.patch('/users/:userId/block', auth('admin'), userController.blockUser);
router.post(
  '/create-user',
  auth('admin'),
  requestValidation(userValidation.userSchema),
  userController.createUser,
);
router.get('/user', auth('admin'), userController.getUser);
router.get('/user/:userId', auth('admin'), userController.getUserById);
router.delete('/blogs/:id', auth('admin'), userController.deleteBlog);

export const userRouter = router;

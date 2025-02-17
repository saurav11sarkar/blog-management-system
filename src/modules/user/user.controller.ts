import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';
import sendRespons from '../../utils/sendRespons';

const blockUser = catchAsync(async (req, res) => {
  const result = await userService.blockUser(req.params.userId);
  sendRespons(res, 200, 'User blocked successfully', result);
});

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendRespons(res, 200, 'create user successfully', result);
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();
  sendRespons(res, 200, 'get all user', result);
});

const getUserById = catchAsync(async (req, res) => {
  const result = await userService.getUserById(req.params.id);
  sendRespons(res, 200, 'get user by id', result);
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await userService.deleteBlog(req.params.id);
  sendRespons(res, 200, 'delete blog successfully', result);
});

export const userController = {
  blockUser,
  createUser,
  getUser,
  getUserById,
  deleteBlog,
};

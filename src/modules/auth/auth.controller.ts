import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespons';
import { authService } from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  sendResponse(res, 200, 'Login successful', result.token);
});

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  sendResponse(res, 201, 'User registered successfully', result);
});

export const authController = {
  login,
  register,
};

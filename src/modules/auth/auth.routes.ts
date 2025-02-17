import express from 'express';
import { authController } from './auth.controller';
import requestValidation from '../../middlewares/requestValidation';
import { authValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/login',
  requestValidation(authValidation.loginSchema),
  authController.login,
);
router.post(
  '/register',
  requestValidation(authValidation.registerSchema),
  authController.register,
);

export const AuthRoutes = router;

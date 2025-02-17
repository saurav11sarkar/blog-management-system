import config from '../../config';
import User from '../user/user.model';
import { ILogin, IRegister } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (payload: IRegister) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) throw new Error('Invalid credentials');
  if (user.isBlocked) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new Error('Password is incorrect');

  const { _id, name, email, role } = user;
  const token = jwt.sign(
    { _id, name, email, role },
    config.jwtSecret as string,
    { expiresIn: '1d' },
  );

  const { password: _, ...result } = user.toObject();
  return {
    token: `Bearer ${token}`,
    result,
  };
};

export const authService = {
  register,
  login,
};

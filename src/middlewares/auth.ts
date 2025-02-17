import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../modules/user/user.model';
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
const auth = (request: string[] | string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw new Error('You are not authorized');
      const tokenString = token.split(' ')[1];
      const decode = jwt.verify(
        tokenString,
        config.jwtSecret as string,
      ) as JwtPayload;
      const { _id, email, role } = decode;

      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid token: User not found');

      if (Array.isArray(request)) {
        if (!request.includes(role)) throw new Error('You are not authorized');
      }
      if (typeof request === 'string') {
        if (request !== role) throw new Error('You are not authorized');
      }
      req.user = decode as JwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;

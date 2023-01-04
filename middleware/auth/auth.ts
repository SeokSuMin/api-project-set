import * as jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';
dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization as string;
    const verify = jsonwebtoken.verify(auth.split(' ')[1], process.env.JWT_SECRET as string);
    next();
  } catch (error: any) {
    console.log('error', error);

    // 인증 실패
    if (error === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    });
  }
};

export const createToken = (req: Request) => {
  const { userId, password } = req.body.loginInfo;
  const tempNickname = 'shark';
  const token = jsonwebtoken.sign(
    {
      type: 'jwt',
      userId,
      nickname: tempNickname,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '30m',
      issuer: 'sumin',
    },
  );
  return token;
};

export const extendToken = (req: Request) => {
  const tempNickname = 'extend shark';
  const auth = req.headers.authorization as string;
  const { userId } = jwtDecode(auth) as any;
  const token = jsonwebtoken.sign(
    {
      type: 'jwt',
      userId,
      nickname: tempNickname,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '30m',
      issuer: 'sumin',
    },
  );
  return token;
};

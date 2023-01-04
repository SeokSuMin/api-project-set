import * as express from 'express';
import { createToken, extendToken, verifyToken } from '../middleware/auth/auth';
const router = express.Router();

router.get('/', verifyToken, async (req, res, next) => {
  try {
    return res.send('로그인 검증 성공!');
  } catch (err) {
    console.log(err);
    return res.status(500).send('서버 에러가 발생하였습니다.');
  }
});

router.get('/extend', verifyToken, async (req, res, next) => {
  try {
    const token = extendToken(req);
    return res.status(201).json({
      message: 'success extend token!',
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('서버 에러가 발생하였습니다.');
  }
});

// 로그인 토큰발급
router.post('/login', async (req, res, next) => {
  try {
    const token = createToken(req);
    return res.status(201).json({
      message: 'success token created!',
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('서버 에러가 발생하였습니다.');
  }
});
export default router;

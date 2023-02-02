import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

import { response } from '../utils/common.js';

export const authMiddleware = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0].toLowerCase() === 'bearer') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, function (err, decode) {
      
      if (err) {
        return response(res, 401, { message: 'Phiên đăng nhập hết hạn' });
      }

      req.user = decode;

      next();
    });
  } else {
    return response(res, 401, { message: 'Phiên đăng nhập hết hạn' });
  }
}
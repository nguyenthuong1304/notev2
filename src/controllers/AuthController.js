import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { UserModel } from '../models/index.js';
import { response } from '../utils/common.js';
import { compare, hash } from '../utils/bcryp.js';
import { validationResult } from 'express-validator';

export const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return response(res, 422, { errors: errors.array() })
  }

  const { username, password, email } = req.body;

  const user = new UserModel({
    _id: mongoose.Types.ObjectId(),
    username,
    password: await hash(password),
    email,
  });

  return user
    .save()
    .then(() => response(res, 201, { message: 'Đăng kí thành công' }))
    .catch(err => {
      return response(res, 500, { message: 'Đăng kí thất bại!' });
    })
}

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user && await compare(password, user.password)) {
    return response(res, 200, {
      accessToken: jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h'}
      ),
      type: 'bearer',
      message: 'Đăng nhập thành công',
    })
  } else {
    return response(res, 401, { message: 'Sai mật khẩu hoặc tài khoản!' })
  }
}
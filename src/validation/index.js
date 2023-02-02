import { check } from "express-validator";

const validateRegisterUser = () => {
  return [ 
    check('username', 'Username không được bỏ trống').not().isEmpty(),
    check('username', 'Username không hợp lệ').isAlphanumeric(),
    check('username', 'Username phải dài hơn 6 kí tự').isLength({ min: 6 }),
    check('email', 'Email không được bỏ trống').not().isEmpty(),
    check('email', 'Email không hợp lệ').isEmail(),
    check('password', 'Mật khẩu không được bỏ trống').not().isEmpty(),
    check('password', 'Mật khẩu phải dài hơn 6 kí tự').isLength({ min: 6 })
  ]; 
}

const validateNote = () => {
  return [ 
    check('title', 'Tiêu đề không được bỏ trống').not().isEmpty(),
    check('title', 'Tiêu đề quá dài, không được quá 255 kí tự!').isLength({ max: 255 }),
    check('content', 'Nội dung quá dài, không được quá 10.000 kí tựg').isLength({ max: 10000 }),
  ]; 
}

export const validate = { validateRegisterUser, validateNote };
export const response = (res, statusCode, agrs = {}) => {
  return res
    .status(statusCode)
    .json(agrs)
}
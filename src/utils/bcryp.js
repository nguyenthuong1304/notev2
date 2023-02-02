import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hash = async password => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const compare = async (password, hashed) => {
  const match = await bcrypt.compare(password, hashed);
  return match;
};

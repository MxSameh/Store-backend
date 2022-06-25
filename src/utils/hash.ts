import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const salt = parseInt(process.env.SALT as string) ;
const peper = process.env.PEPER;

export const hash = (password: string) : string  => {
  const hashedPassword = bcrypt.hashSync(password + peper, salt);
  return hashedPassword;
}

export const compare = (password : string, hashedPassword : string) : Boolean => {
  const verified = bcrypt.compareSync(password + peper, hashedPassword);
  return verified;
}


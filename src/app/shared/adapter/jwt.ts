import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface Token {
  sign(token: string): string;
  verify(token: string): string | jwt.JwtPayload;
}

const jwtKey = process.env.JWT_KEY as string;

export class JwtToken implements Token {
  sign(token: any): string {
    return jwt.sign(token, jwtKey, { expiresIn: '1h' });
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, jwtKey, { maxAge: '1h' });
  }
}

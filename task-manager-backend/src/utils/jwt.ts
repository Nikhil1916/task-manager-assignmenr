import * as jwt from "jsonwebtoken";
import { ENV } from "../config/env";
export interface JwtPayload {
    sub: string; //user id
}

export function signToken(userId: string) {
  if (!ENV.JWT_SECRET) throw new Error("JWT_SECRET missing in .env");

  const payload: JwtPayload = { sub: userId };
  const expiresIn = ENV.JWT_EXPIRES_IN as unknown as jwt.SignOptions['expiresIn'];

  return jwt.sign(payload, ENV.JWT_SECRET as string, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
}
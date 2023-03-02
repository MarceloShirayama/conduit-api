import * as jwt from "./jose";

type JwtPayload = { [propName: string]: unknown };

export const generateToken = (payload: JwtPayload, expirationTime?: string) =>
  jwt.signJwt(payload, expirationTime);

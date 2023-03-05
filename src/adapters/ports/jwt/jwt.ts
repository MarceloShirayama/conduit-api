import { jwtVerify, signJwt } from "./jose";

type JwtPayload = {
  [propName: string]: unknown;
};

export const generateToken = async (
  payload: JwtPayload,
  expirationTime?: string
) => signJwt(payload, expirationTime);

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify(token);

  return payload;
};

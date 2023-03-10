import { AuthorIdType } from "core/article/types";
import { jwtVerify, signJwt } from "../../jwt/jose";

export type JwtPayload = {
  [propName: string]: unknown;
};

export const generateToken = async (
  payload: JwtPayload,
  expirationTime?: string
) => signJwt(payload, expirationTime);

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify(token);

  const parserPayload = payload as { id: AuthorIdType; exp?: number };
  return parserPayload;
};

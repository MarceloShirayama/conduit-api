import * as jose from "jose";

import { getEnvironmentVariable } from "../../helpers";

const secretKey = getEnvironmentVariable("JWT_SECRET");

if (secretKey.length < 32)
  throw new Error("JWT_SECRET must be at least 32 chars long.");

const encodedSecret = new TextEncoder().encode(secretKey);

export async function signJwt(
  payload: jose.JWTPayload,
  expirationTime: string = "10s"
) {
  const alg = "HS256";
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(expirationTime)
    .sign(encodedSecret);

  return jwt;
}

export async function jwtVerify(token: string) {
  const jwtVerifyResult = await jose.jwtVerify(token, encodedSecret);

  return jwtVerifyResult;
}

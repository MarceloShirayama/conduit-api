import * as jose from "jose";

import * as helpers from "./../../../helpers";

const secretKey = helpers.getEnvironmentVariable("JWT_SECRET");

if (secretKey.length < 32)
  throw new Error("JWT_SECRET must be at least 32 chars long.");

const encodedSecret = new TextEncoder().encode(secretKey);

export async function signJwt(
  payload: jose.JWTPayload,
  expirationTime: string = "10m"
) {
  const alg = "HS256";
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(expirationTime)
    .sign(encodedSecret);

  return jwt;
}

export async function jwtVerify(token: string) {
  const { payload, protectedHeader } = await jose.jwtVerify(
    token,
    encodedSecret
  );

  return payload;
}

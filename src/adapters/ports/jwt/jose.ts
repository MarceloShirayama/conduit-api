import * as jose from "jose";

import * as helpers from "./../../../helpers";

export type Payload = { id: number };

export async function signJwt(payload: Payload, alg: string = "HS256") {
  const secretKey = helpers.getEnvironmentVariable("JWT_SECRET");
  const encodedSecret = new TextEncoder().encode(secretKey);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime("10m")
    .sign(encodedSecret);

  return jwt;
}

export async function jwtVerify(jwt: string, secretKey: string) {
  const encodedSecret = new TextEncoder().encode(secretKey);
  const { payload, protectedHeader } = await jose.jwtVerify(jwt, encodedSecret);

  return payload;
}

// (async () => {
//   const JWT_SECRET = helpers.getEnvironmentVariable("JWT_SECRET");

//   const jwt = await signJwt(JWT_SECRET, { id: 1, username: "marcelo" });
//   console.log(jwt);

//   const payload = await jwtVerify(jwt, JWT_SECRET);

//   console.log({ payload });
// })();

import * as jwt from "./jose";

export const generateToken = (payload: jwt.Payload) => jwt.signJwt(payload);

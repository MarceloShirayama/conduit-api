import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";

import { verifyToken } from "../jwt";

export type ResponseError = {
  errors: {
    body: string[];
  };
};

export const getError = (error: string): ResponseError => ({
  errors: {
    body: error.split(":::"),
  },
});

export const getToken = async (authorizationHeader: string = "") => {
  const token = authorizationHeader?.replace("Token ", "") ?? "";
  const payload = await verifyToken(token);

  return payload;
};

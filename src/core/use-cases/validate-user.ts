import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { failure } from "io-ts/PathReporter";

import { CreateUserType } from "../types";

export type ValidateUser = (data: CreateUserType) => E.Either<Error, unknown>;

export const validateUser: ValidateUser = (data) => {
  return pipe(
    CreateUserType.decode(data),
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
};

import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { failure } from "io-ts/PathReporter";

import { CreateUserType, LoginUserType } from "../types";
import { ValidateType } from "../../ports";
export const validateUser = <ValidateType<CreateUserType>>((data) => {
  return pipe(
    data,
    CreateUserType.decode,
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
});

export const validateLoginUser = <ValidateType<LoginUserType>>((data) => {
  return pipe(
    data,
    LoginUserType.decode,
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
});

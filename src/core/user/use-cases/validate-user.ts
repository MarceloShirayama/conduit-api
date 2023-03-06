import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { failure } from "io-ts/PathReporter";

import { CreateUserType } from "../types";
import { ValidateType } from "../../ports";

export const validateUser: ValidateType<CreateUserType> = (data) => {
  return pipe(
    CreateUserType.decode(data),
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
};

import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { CreateUserType } from "core/types";
import { validateUser } from ".";
import { OutsideFunction } from "../../ports";

export type RegisterUser = <A>(
  outsideRegister: OutsideFunction<CreateUserType, A>
) => (data: CreateUserType) => TE.TaskEither<Error, A>;

export const registerUser: RegisterUser = (outsideRegister) => (data) => {
  return pipe(
    data,
    validateUser,
    TE.fromEither,
    TE.chain(() => TE.tryCatch(() => outsideRegister(data), E.toError))
  );
};

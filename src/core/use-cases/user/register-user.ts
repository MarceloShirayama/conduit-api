import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { CreateUserType } from "core/types";
import { validateUser } from ".";

export type OutsideRegister<A> = (data: CreateUserType) => Promise<A>;

export type Register = <A>(
  outsideRegister: OutsideRegister<A>
) => (data: CreateUserType) => TE.TaskEither<Error, A>;

export const register: Register = (outsideRegister) => (data) => {
  return pipe(
    data,
    validateUser,
    TE.fromEither,
    TE.chain(() => TE.tryCatch(() => outsideRegister(data), E.toError))
  );
};

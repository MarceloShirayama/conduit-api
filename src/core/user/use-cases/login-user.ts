import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { OutsideFunction } from "../../ports";
import { LoginUserType } from "../types";
import { validateLoginUser } from "./validate-user";

export type LoginUser = <A>(
  outsideLogin: OutsideFunction<LoginUserType, A>
) => (data: LoginUserType) => TE.TaskEither<Error, A>;

export const loginUser = <LoginUser>((outsideLogin) => (data) => {
  return pipe(
    data,
    validateLoginUser,
    TE.fromEither,
    TE.chain(() => TE.tryCatch(() => outsideLogin(data), E.toError))
  );
});

import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { CreateUserType, UserType } from "../../../../core/user/types";
import { registerUserAdapter } from "../../../../core/user/use-cases";
import { createUser } from "../../../adapters/db";
import { getError } from "../http";

type UserRequest = {
  user: UserType;
};

type UserResponse = {
  user: UserType;
};

type CreateUserHttp = (input: UserRequest) => UserResponse;

const createUserHttp = <CreateUserHttp>(({ user }) => ({ user }));

export const registerUserHttpAdapter = (data: CreateUserType) => {
  return pipe(
    data,
    registerUserAdapter(createUser),
    TE.map(createUserHttp),
    TE.mapLeft((error) => getError(error.message))
  );
};

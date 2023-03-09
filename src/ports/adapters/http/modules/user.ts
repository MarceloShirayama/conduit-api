import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import {
  CreateUserType,
  LoginUserType,
  UserType,
} from "../../../../core/user/types";
import {
  registerUserAdapter,
  loginUserAdapter,
} from "../../../../core/user/use-cases";
import { createUser, loginUser } from "../../../adapters/db";
import { getError } from "../http";

type CreateUserRequest = {
  user: UserType;
};

type CreateUserResponse = {
  user: UserType;
};

type CreateUserHttp = (input: CreateUserRequest) => CreateUserResponse;

const createUserHttp = <CreateUserHttp>(({ user }) => ({ user }));

export const registerUserHttpAdapter = (data: CreateUserType) => {
  return pipe(
    data,
    registerUserAdapter(createUser),
    TE.map(createUserHttp),
    TE.mapLeft((error) => getError(error.message))
  );
};

type LoginUserRequest = {
  user: UserType;
};

type LoginUserResponse = {
  user: UserType;
};

type LoginUserHttp = (input: LoginUserRequest) => LoginUserResponse;

const loginUserHttp = <LoginUserHttp>(({ user }) => ({ user }));

export const loginUserHttpAdapter = (data: LoginUserType) => {
  return pipe(
    data,
    loginUserAdapter(loginUser),
    TE.map(loginUserHttp),
    TE.mapLeft((error) => getError(error.message))
  );
};

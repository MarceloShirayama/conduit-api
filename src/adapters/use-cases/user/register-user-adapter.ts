import * as ports from "core/use-cases/ports";
import * as types from "../../../core/types";
import * as user from "../../../core/use-cases/user";

export type DBUser = types.UserType & { id: string; password: string };

export type OutsideRegisterUserInDB = ports.OutsideFunction<
  types.CreateUserType,
  DBUser | undefined
>;

export type OutsideRegisterUser = ports.OutsideFunction<
  types.UserType & { password: string },
  { user: types.UserType }
>;

export const registerUser: user.RegisterUser = (outsideRegister) => (data) =>
  user.registerUser(outsideRegister)(data);

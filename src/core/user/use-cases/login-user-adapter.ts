import { OutsideFunction } from "../../ports";
import { LoginUserType, UserType } from "../types";
import { loginUser, LoginUser } from "./login-user";
import { DBUser } from "./register-user-adapter";

export type OutsideLoginUserInDB = OutsideFunction<LoginUserType, DBUser>;

export type OutsideLoginUser = OutsideFunction<
  LoginUserType,
  { user: UserType }
>;

export const loginUserAdapter = <LoginUser>(
  ((outsideLogin) => (data) => loginUser(outsideLogin)(data))
);

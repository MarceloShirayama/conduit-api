import * as ports from "core/use-cases/ports";
import * as types from "../../../core/types";
import * as user from "../../../core/use-cases/user";

export type OutsideRegisterUser = ports.OutsideFunction<
  types.CreateUserType,
  { user: types.UserType }
>;

export const registerUser: user.RegisterUser = (outsideRegister) => (data) =>
  user.registerUser(outsideRegister)(data);

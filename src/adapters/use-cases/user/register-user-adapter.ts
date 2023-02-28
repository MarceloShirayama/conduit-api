import { OutsideFunction } from "core/use-cases/ports";
import { CreateUserType, UserType } from "../../../core/types";
import {
  RegisterUser,
  registerUser as registerUserCore,
} from "../../../core/use-cases/user/register-user";

export type OutsideRegisterUser = OutsideFunction<
  CreateUserType,
  { user: UserType }
>;

export const registerUser: RegisterUser = (outsideRegister) => (data) =>
  registerUserCore(outsideRegister)(data);

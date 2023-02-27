import { UserType } from "../../../core/types";
import {
  OutsideRegister,
  RegisterUser,
  registerUser as registerUserCore,
} from "../../../core/use-cases/user/register-user";

export type OutsideRegisterType = OutsideRegister<{ user: UserType }>;

export const registerUser: RegisterUser = (outsideRegister) => (data) =>
  registerUserCore(outsideRegister)(data);

import { CreateUserType, UserType } from "../../../core/user/types";
import { OutsideFunction } from "../../../core/ports";
import { registerUser, RegisterUser } from "../../../core/user/use-cases";

export type DBUser = UserType & { id: string; password: string };

export type OutsideRegisterUserInDB = OutsideFunction<CreateUserType, DBUser>;

export type OutsideRegisterUser = OutsideFunction<
  UserType & { password: string },
  { user: UserType }
>;

export const registerUserAdapter: RegisterUser = (outsideRegister) => (data) =>
  registerUser(outsideRegister)(data);

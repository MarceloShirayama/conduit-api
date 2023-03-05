import { CreateUserType, UserType } from "../../../core/types";
import { OutsideFunction } from "../../../core/use-cases/ports";
import { registerUser, RegisterUser } from "../../../core/use-cases/user";

export type DBUser = UserType & { id: string; password: string };

export type OutsideRegisterUserInDB = OutsideFunction<CreateUserType, DBUser>;

export type OutsideRegisterUser = OutsideFunction<
  UserType & { password: string },
  { user: UserType }
>;

export const registerUserAdapter: RegisterUser = (outsideRegister) => (data) =>
  registerUser(outsideRegister)(data);

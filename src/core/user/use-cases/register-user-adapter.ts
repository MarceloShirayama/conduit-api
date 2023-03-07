import { CreateUserType, UserType } from "../types";
import { OutsideFunction } from "../../ports";
import { registerUser, RegisterUser } from "./register-user";

export type DBUser = UserType & { id: string; password: string };

export type OutsideRegisterUserInDB = OutsideFunction<CreateUserType, DBUser>;

export type OutsideRegisterUser = OutsideFunction<
  UserType & { password: string },
  { user: UserType }
>;

export const registerUserAdapter = <RegisterUser>(
  ((outsideRegister) => (data) => registerUser(outsideRegister)(data))
);

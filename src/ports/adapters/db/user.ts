import { loginUserInDB } from "../../db-in-memory";
import {
  OutsideLoginUser,
  OutsideRegisterUser,
} from "../../../core/user/use-cases";
import { generateToken } from "../jwt";
import { createUserInDB } from "./db";

export const createUser = <OutsideRegisterUser>(async (data) => {
  const registeredUser = await createUserInDB(data);

  const token = await generateToken({ id: registeredUser.id });

  const { id, password, ...user } = { ...registeredUser, token };

  return { user };
});

export const loginUser = <OutsideLoginUser>(async (data: any) => {
  const userData = await loginUserInDB(data);

  const token = await generateToken({ id: userData.id });

  const { id, ...user } = { ...userData, token };

  return { user };
});

import { OutsideRegisterUser } from "../../use-cases/user";
import { generateToken } from "../jwt";
import { createUserInDB } from "./db";

export const createUser: OutsideRegisterUser = async (data) => {
  const registeredUser = await createUserInDB(data);

  const token = await generateToken({ id: registeredUser.id });

  return {
    user: {
      username: registeredUser.username,
      email: registeredUser.email,
      token,
    },
  };
};

import {
  OutsideLoginUserInDB,
  OutsideRegisterUserInDB,
} from "../../core/user/use-cases";
import { v4 as uuidV4 } from "uuid";

import { db } from ".";
import { checkPassword, hashPassword } from "../adapters/hash";

export const createUserInDB = <OutsideRegisterUserInDB>(async (data) => {
  if (db.userByEmail[data.email])
    throw new Error("Already exists user registered with this email!");

  const id = uuidV4();
  const password = await hashPassword(data.password);

  db.users[id] = {
    id,
    email: data.email,
    username: data.username,
    password,
  };

  db.userByEmail[data.email] = id;

  return db.users[id];
});

export const loginUserInDB = <OutsideLoginUserInDB>(async (data) => {
  const userId = db.userByEmail[data.email];

  const userFound = db.users[userId];

  const matchPassword = await checkPassword(userFound.password, data.password);

  if (!userFound || !matchPassword)
    throw new Error("Invalid email or password!");

  const { password, ...user } = userFound;

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    bio: user.bio ?? "",
    image: user.image ?? "",
  };
});

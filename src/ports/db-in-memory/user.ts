import {
  OutsideLoginUserInDB,
  OutsideRegisterUserInDB,
} from "../../core/user/use-cases";
import { v4 as uuidV4 } from "uuid";

import { db } from ".";

export const createUserInDB = <OutsideRegisterUserInDB>(async (data) => {
  const id = uuidV4();

  db.users[id] = {
    id,
    email: data.email,
    username: data.username,
    password: data.password,
  };

  db.userByEmail[data.email] = id;

  return db.users[id];
});

export const loginUserInDB = <OutsideLoginUserInDB>(async (data) => {
  const userId = db.userByEmail[data.email];

  const userFound = db.users[userId];

  if (!userFound || userFound.password !== data.password)
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

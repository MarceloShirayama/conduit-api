import { v4 as uuidV4 } from "uuid";

import { OutsideRegisterUserInDB } from "../../../adapters/use-cases/user";
import { db } from "./";

export const createUserInDB: OutsideRegisterUserInDB = async (data) => {
  const id = uuidV4();

  db.users[id] = {
    id,
    email: data.email,
    username: data.username,
    password: data.password,
  };

  return db.users[id];
};

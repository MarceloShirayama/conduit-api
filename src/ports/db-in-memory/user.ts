import { OutsideRegisterUserInDB } from "../../core/user/use-cases";
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

  return db.users[id];
});

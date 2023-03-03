import { v4 as uuidV4 } from "uuid";

import * as user from "../../use-cases/user";

type DB = {
  users: {
    [id: string]: user.DBUser;
  };
};

const db: DB = {
  users: {},
};

export const createUserInDB: user.OutsideRegisterUserInDB = async (data) => {
  const id = uuidV4();

  db.users[id] = {
    id,
    email: data.email,
    username: data.username,
    password: data.password,
  };

  return db.users[id];
};

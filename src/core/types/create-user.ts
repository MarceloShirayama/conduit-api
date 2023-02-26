import * as t from "io-ts";

import { SlugType, PasswordType, EmailType } from "./scalar";

export const CreateUserType = t.strict(
  {
    email: EmailType,
    password: PasswordType,
    username: SlugType,
  },
  "CreateUserType"
);

export type CreateUserType = t.TypeOf<typeof CreateUserType>;

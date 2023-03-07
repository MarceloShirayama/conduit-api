import * as t from "io-ts";

import { EmailType, PasswordType } from "../../types";

export const LoginUserType = t.strict(
  {
    email: EmailType,
    password: PasswordType,
  },
  "LoginUserType"
);

export type LoginUserType = t.TypeOf<typeof LoginUserType>;

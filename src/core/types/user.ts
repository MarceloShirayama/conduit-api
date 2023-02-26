import * as t from "io-ts";

import {
  EmailType,
  PasswordType,
  BioType,
  TokenType,
  ImageUrlType,
} from "./scalar";

export const UserType = t.strict(
  {
    email: EmailType,
    password: PasswordType,
    token: TokenType,
    bio: BioType,
    image: ImageUrlType,
  },
  "UserType"
);

export type UserType = t.TypeOf<typeof UserType>;

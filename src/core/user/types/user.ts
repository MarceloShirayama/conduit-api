import * as t from "io-ts";

import {
  BioType,
  EmailType,
  ImageUrlType,
  SlugType,
  TokenType,
} from "../../types";

const UserRequiredType = t.strict({
  email: EmailType,
  username: SlugType,
});

const UserOptionalType = t.partial({
  token: TokenType,
  bio: BioType,
  image: ImageUrlType,
});

export const UserType = t.intersection(
  [UserRequiredType, UserOptionalType],
  "UserType"
);

export type UserType = t.TypeOf<typeof UserType>;

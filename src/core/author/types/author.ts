import * as t from "io-ts";

import { ProfileType } from "../../profile/types";

export type AuthorType = {
  author?: ProfileType;
};

export const AuthorType: t.Type<AuthorType> = t.recursion("AuthorType", () =>
  t.partial(
    {
      author: ProfileType,
    },
    "AuthorType"
  )
);

import * as t from "io-ts";

import { ProfileType } from "./";
import { DateType, IdType } from "./scalar";

const ParcialCommentType = t.strict({
  id: IdType,
  createdAt: DateType,
  updatedAt: DateType,
});

export type AuthorType = {
  author: ProfileType;
};

export const AuthorType: t.Type<AuthorType> = t.recursion("AuthorType", () =>
  t.type(
    {
      author: ProfileType,
    },
    "AuthorType"
  )
);

export const CommentType = t.intersection(
  [ParcialCommentType, AuthorType],
  "CommentType"
);

export type CommentType = t.TypeOf<typeof CommentType>;

import * as t from "io-ts";
import { AuthorType } from "../../author/types";

import { BodyType, DateType, IdType } from "../../types";

const ParcialCommentType = t.strict({
  id: IdType,
  createdAt: DateType,
  updatedAt: DateType,
  body: BodyType,
});

export const CommentType = t.intersection(
  [ParcialCommentType, AuthorType],
  "CommentType"
);

export type CommentType = t.TypeOf<typeof CommentType>;

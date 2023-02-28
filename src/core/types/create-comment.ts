import * as t from "io-ts";

import { BodyType } from "./scalar";

export const CreateCommentType = t.strict(
  {
    body: BodyType,
  },
  "CreateCommentType"
);

export type CreateCommentType = t.TypeOf<typeof CreateCommentType>;

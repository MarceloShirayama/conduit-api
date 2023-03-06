import * as t from "io-ts";
import { UUID, withMessage } from "io-ts-types";

import { BodyType, SlugType } from "../../types";

export const CreateCommentType = t.strict(
  {
    authorId: withMessage(UUID, () => "Invalid author id."),
    articleSlug: SlugType,
    body: BodyType,
  },
  "CreateCommentType"
);

export type CreateCommentType = t.TypeOf<typeof CreateCommentType>;

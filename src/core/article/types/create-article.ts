import * as t from "io-ts";
import { UUID, withMessage } from "io-ts-types";

import { BodyType, DescriptionType, TagType, TitleType } from "../../types";

export const CreateArticleRequiredType = t.strict({
  title: TitleType,
  description: DescriptionType,
  body: BodyType,
  authorId: withMessage(UUID, () => "Invalid author id."),
});

export const CreateArticleOptionalType = t.partial({
  tagList: t.array(TagType),
});

export const CreateArticleType = t.intersection(
  [CreateArticleRequiredType, CreateArticleOptionalType],
  "CreateArticleType"
);

export type CreateArticleType = t.TypeOf<typeof CreateArticleType>;

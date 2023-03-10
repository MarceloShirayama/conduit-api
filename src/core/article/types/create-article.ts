import * as t from "io-ts";
import { UUID, withMessage } from "io-ts-types";

import { BodyType, DescriptionType, TagType, TitleType } from "../../types";

const AuthorIdType = withMessage(UUID, () => "Invalid author id.");

export type AuthorIdType = t.TypeOf<typeof AuthorIdType>;

export const CreateArticleRequiredType = t.strict({
  title: TitleType,
  description: DescriptionType,
  body: BodyType,
  authorId: AuthorIdType,
});

export const CreateArticleOptionalType = t.partial({
  tagList: t.array(TagType),
});

export const CreateArticleType = t.intersection(
  [CreateArticleRequiredType, CreateArticleOptionalType],
  "CreateArticleType"
);

export type CreateArticleType = t.TypeOf<typeof CreateArticleType>;

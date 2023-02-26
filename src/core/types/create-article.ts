import * as t from "io-ts";

import { BodyType, DescriptionType, TagType, TitleType } from "./scalar";

export const CreateArticleRequiredType = t.strict({
  title: TitleType,
  description: DescriptionType,
  body: BodyType,
});

export const CreateArticleOptionalType = t.partial({
  tagList: t.array(TagType),
});

export const CreateArticleType = t.intersection(
  [CreateArticleRequiredType, CreateArticleOptionalType],
  "CreateArticleType"
);

export type CreateArticleType = t.TypeOf<typeof CreateArticleType>;

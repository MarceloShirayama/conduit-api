import * as t from "io-ts";

import { AuthorType, ProfileType } from "./";
import {
  BodyType,
  BooleanType,
  DateType,
  DescriptionType,
  PositiveType,
  SlugType,
  TagType,
  TitleType,
} from "./scalar";

const ParcialArticle = t.type({
  slug: SlugType,
  title: TitleType,
  description: DescriptionType,
  body: BodyType,
  tagList: t.array(TagType),
  createdAt: DateType,
  updatedAt: DateType,
  favorited: BooleanType,
  favoritesCount: PositiveType,
});

export const ArticleType = t.intersection(
  [ParcialArticle, AuthorType],
  "ArticleType"
);

export type ArticleType = t.TypeOf<typeof ArticleType>;

export const ArticlesType = t.type({
  article: t.array(ArticleType),
  articlesCount: PositiveType,
});

export type ArticlesType = t.TypeOf<typeof ArticleType>;

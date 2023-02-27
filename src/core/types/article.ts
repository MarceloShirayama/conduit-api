import * as t from "io-ts";

import { ProfileType } from "./";
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

type AuthorType = {
  author?: ProfileType;
};

const AuthorType: t.Type<AuthorType> = t.recursion("AuthorType", () =>
  t.partial(
    {
      author: ProfileType,
    },
    "AuthorType"
  )
);

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

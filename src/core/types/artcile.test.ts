import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { mapAll } from "../../test/config/fixtures";
import { ArticleType } from "./article";

describe("Article type", () => {
  const validArticle: unknown = {
    author: {
      bio: "any bio with 10 chars",
      following: true,
      image: "http://image-url.com",
      username: "any-username",
    },
    body: "any body",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
    description: "any description",
    favorited: false,
    favoritesCount: 1,
    slug: "any-slug",
    tagList: ["any-slug"],
    title: "any title",
  };

  const invValidArticleWithWrongCreatedAt: unknown = {
    author: {
      bio: "any bio with 10 chars",
      following: true,
      image: "http://image-url.com",
      username: "any-username",
    },
    body: "any body",
    createdAt: "2023-01-35",
    updatedAt: "2023-01-01",
    description: "any description",
    favorited: false,
    favoritesCount: 1,
    slug: "any-slug",
    tagList: ["any-slug"],
    title: "any title",
  };

  it("Should validate article properly", () => {
    pipe(
      validArticle,
      ArticleType.decode,
      TE.fromEither,
      mapAll((result) => expect(result).toBe(validArticle))
    )();
  });

  it("Should not validate article with invalid createdAt", () => {
    pipe(
      invValidArticleWithWrongCreatedAt,
      ArticleType.decode,
      TE.fromEither,
      mapAll((error) => expect(new Error("Invalid date.")))
    )();
  });
});

import slugify from "slugify";
import { v4 as uuidV4 } from "uuid";

import { OutsideRegisterArticleInDB } from "../../use-cases/article";
import { db } from "./";

export const createArticleInDB: OutsideRegisterArticleInDB = async (data) => {
  const dateNow = new Date().toISOString();

  const { title, description, body, authorId, tagList } = data;

  const { users } = db;

  const author = users?.[authorId];

  if (!author) throw new Error(`Not found author with id: ${authorId}`);

  const articleId = uuidV4();

  const articleSlug = slugify(title, { lower: true });

  db.articlesBySlug[articleSlug] = articleId;

  db.articles[articleId] = {
    id: articleId,
    slug: articleSlug,
    title,
    description,
    body,
    tagList: tagList ?? [],
    createdAt: dateNow,
    updatedAt: dateNow,
    favorited: false,
    favoritesCount: 0,
    author: {
      username: author.username,
      bio: author.bio ?? "",
      image: author.image ?? "",
      following: false,
    },
  };

  return db.articles[articleId];
};

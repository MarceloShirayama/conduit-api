import { OutsideAddCommentToAnArticleInDB } from "../../core/comment/use-cases";
import { db } from "./db-in-memory";

export const addCommentToAnArticleInDb = <OutsideAddCommentToAnArticleInDB>(
  (async (data) => {
    const dateNow = new Date();
    const dateString = dateNow.toISOString();
    const dateNumber = dateNow.getTime();

    const { articleSlug, authorId, body } = data;

    const articleId = db.articlesBySlug[articleSlug];

    if (!articleId)
      throw new Error(`Not found article with slug: ${articleSlug}`);

    db.comments[articleId] = (db.comments[articleId] ?? []).concat({
      id: dateNumber,
      createdAt: dateString,
      updatedAt: dateString,
      body,
      authorId,
      articleId,
    });

    if (!db.users[data.authorId])
      throw new Error(`Not found author with id: ${data.authorId}`);

    const { id, password, ...author } = db.users[data.authorId];

    return {
      id: dateNumber,
      createdAt: dateString,
      updatedAt: dateString,
      body,
      authorId,
      articleId,
      author: {
        username: author.username,
        bio: author.bio ?? "",
        image: author.image ?? "",
        following: false,
      },
    };
  })
);

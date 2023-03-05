import { DBArticle } from "../../use-cases/article";
import { ArticleID, DBComment } from "../../use-cases/comment";
import { DBUser } from "../../use-cases/user";

export type DB = {
  users: { [id: string]: Omit<DBUser, "token"> };
  articles: { [id: string]: DBArticle };
  articlesBySlug: { [slug: string]: ArticleID };
  comments: { [articleId: string]: DBComment[] };
};

export const db: DB = {
  users: {},
  articles: {},
  articlesBySlug: {},
  comments: {},
};

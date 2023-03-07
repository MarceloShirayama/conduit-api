import { DBArticle } from "../../core/article/use-cases";
import { ArticleID, DBComment } from "../../core/comment/use-cases";
import { DBUser } from "../../core/user/use-cases";

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

import { DBArticle } from "../../core/article/use-cases";
import { DBComment } from "../../core/comment/use-cases";
import { DBUser } from "../../core/user/use-cases";

type ArticleID = string;
type UserID = string;

type DB = {
  users: { [id: string]: Omit<DBUser, "token"> };
  userByEmail: { [email: string]: UserID };
  articles: { [id: string]: DBArticle };
  articlesBySlug: { [slug: string]: ArticleID };
  comments: { [articleId: string]: DBComment[] };
};

export const db: DB = {
  users: {},
  userByEmail: {},
  articles: {},
  articlesBySlug: {},
  comments: {},
};

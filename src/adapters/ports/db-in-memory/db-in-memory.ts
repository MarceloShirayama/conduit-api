import { DBArticle } from "../../use-cases/article";
import { DBUser } from "../../use-cases/user";

export type DB = {
  users: { [id: string]: DBUser };
  articles: { [id: string]: DBArticle };
};

export const db: DB = {
  users: {},
  articles: {},
};

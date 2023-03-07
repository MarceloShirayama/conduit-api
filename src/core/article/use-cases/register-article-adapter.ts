import { ArticleType, CreateArticleType } from "../types";
import { registerArticle, RegisterArticle } from "./register-article";
import { OutsideFunction } from "../../ports";

export type DBArticle = ArticleType & { id: string };

export type OutsideRegisterArticleInDB = OutsideFunction<
  CreateArticleType,
  DBArticle
>;

export type OutsideRegisterArticle = OutsideFunction<
  CreateArticleType,
  { article: ArticleType }
>;

export const registerArticleAdapter = <RegisterArticle>(
  ((outsideRegister) => (data) => registerArticle(outsideRegister)(data))
);

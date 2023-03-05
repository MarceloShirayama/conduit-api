import { ArticleType, CreateArticleType } from "../../../core/types";
import {
  registerArticle,
  RegisterArticle,
} from "../../../core/use-cases/article";
import { OutsideFunction } from "../../../core/use-cases/ports";

export type DBArticle = ArticleType & { id: string };

export type OutsideRegisterArticleInDB = OutsideFunction<
  CreateArticleType,
  DBArticle
>;

export type OutsideRegisterArticle = OutsideFunction<
  CreateArticleType,
  { article: ArticleType }
>;

export const registerArticleAdapter: RegisterArticle =
  (outsideRegister) => (data) =>
    registerArticle(outsideRegister)(data);

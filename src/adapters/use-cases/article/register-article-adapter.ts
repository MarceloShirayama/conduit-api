import { ArticleType, CreateArticleType } from "../../../core/types";
import {
  RegisterArticle,
  registerArticle,
} from "../../../core/use-cases/article";
import { OutsideFunction } from "../../../core/use-cases/ports";

export type OutsideRegisterArticle = OutsideFunction<
  CreateArticleType,
  { article: ArticleType }
>;

export const registerArticleAdapter: RegisterArticle =
  (outsideRegister) => (data) =>
    registerArticle(outsideRegister)(data);

import { ArticleType, CreateArticleType } from "../../../core/types";
import {
  RegisterArticle,
  registerArticle as registerArticleCore,
} from "../../../core/use-cases/article/register-article";
import { OutsideFunction } from "../../../core/use-cases/ports";

export type OutsideRegisterArticle = OutsideFunction<
  CreateArticleType,
  { article: ArticleType }
>;

export const registerArticle: RegisterArticle = (outsideRegister) => (data) =>
  registerArticleCore(outsideRegister)(data);

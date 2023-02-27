import { ArticleType } from "../../../core/types";
import {
  OutsideRegister,
  RegisterArticle,
  registerArticle as registerArticleCore,
} from "../../../core/use-cases/article/register-article";

export type OutsideRegisterType = OutsideRegister<{ article: ArticleType }>;

export const registerArticle: RegisterArticle = (outsideRegister) => (data) =>
  registerArticleCore(outsideRegister)(data);

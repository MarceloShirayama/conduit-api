import * as types from "../../../core/types";
import * as article from "../../../core/use-cases/article";
import * as ports from "../../../core/use-cases/ports";

export type OutsideRegisterArticle = ports.OutsideFunction<
  types.CreateArticleType,
  { article: types.ArticleType }
>;

export const registerArticleAdapter: article.RegisterArticle =
  (outsideRegister) => (data) =>
    article.registerArticle(outsideRegister)(data);

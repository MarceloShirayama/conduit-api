import * as types from "../../../core/types";
import * as article from "../../../core/use-cases/article";
import * as ports from "../../../core/use-cases/ports";

export type OutsideAddCommentToAnArticle = ports.OutsideFunction<
  types.CreateCommentType,
  { comment: types.CommentType }
>;

export const addCommentToAnArticleAdapter: article.AddCommentToAnArticle =
  (outsideAddComment) => (data) =>
    article.addCommentToAnArticle(outsideAddComment)(data);

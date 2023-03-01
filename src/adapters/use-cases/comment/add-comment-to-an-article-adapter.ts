import * as types from "../../../core/types";
import * as comment from "../../../core/use-cases/comment";
import * as ports from "../../../core/use-cases/ports";

export type OutsideAddCommentToAnArticle = ports.OutsideFunction<
  types.CreateCommentType,
  { comment: types.CommentType }
>;

export const addCommentToAnArticleAdapter: comment.AddCommentToAnArticle =
  (outsideAddComment) => (data) =>
    comment.addCommentToAnArticle(outsideAddComment)(data);

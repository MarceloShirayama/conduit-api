import { CommentType, CreateCommentType } from "../../../core/types";
import {
  AddCommentToAnArticle,
  addCommentToAnArticle,
} from "../../../core/use-cases/article";
import { OutsideFunction } from "../../../core/use-cases/ports";

export type OutsideAddCommentToAnArticle = OutsideFunction<
  CreateCommentType,
  { comment: CommentType }
>;

export const addCommentToAnArticleAdapter: AddCommentToAnArticle =
  (outsideAddComment) => (data) =>
    addCommentToAnArticle(outsideAddComment)(data);

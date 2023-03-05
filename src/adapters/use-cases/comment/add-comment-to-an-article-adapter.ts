import { CommentType, CreateCommentType } from "../../../core/types";
import {
  addCommentToAnArticle,
  AddCommentToAnArticle,
} from "../../../core/use-cases/comment";
import { OutsideFunction } from "../../../core/use-cases/ports";

export type DBComment = CommentType & {
  articleId: string;
  authorId: string;
};

export type ArticleID = string;

export type OutsideAddCommentToAnArticleInDB = OutsideFunction<
  CreateCommentType,
  DBComment
>;

export type OutsideAddCommentToAnArticle = OutsideFunction<
  CreateCommentType,
  { comment: CommentType }
>;

export const addCommentToAnArticleAdapter: AddCommentToAnArticle =
  (outsideAddComment) => (data) =>
    addCommentToAnArticle(outsideAddComment)(data);

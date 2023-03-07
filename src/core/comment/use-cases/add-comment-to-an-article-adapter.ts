import { CommentType, CreateCommentType } from "../types";
import {
  addCommentToAnArticle,
  AddCommentToAnArticle,
} from "./add-comment-to-an-article";
import { OutsideFunction } from "../../ports";

export type DBComment = CommentType & {
  articleId: string;
  authorId: string;
};

export type OutsideAddCommentToAnArticleInDB = OutsideFunction<
  CreateCommentType,
  DBComment
>;

export type OutsideAddCommentToAnArticle = OutsideFunction<
  CreateCommentType,
  { comment: CommentType }
>;

export const addCommentToAnArticleAdapter = <AddCommentToAnArticle>(
  ((outsideAddComment) => (data) =>
    addCommentToAnArticle(outsideAddComment)(data))
);

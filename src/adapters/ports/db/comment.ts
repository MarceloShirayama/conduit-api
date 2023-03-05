import { OutsideAddCommentToAnArticle } from "../../use-cases/comment";
import { addCommentToAnArticleInDb } from "./db";

export const addCommentToAnArticle: OutsideAddCommentToAnArticle = (data) =>
  addCommentToAnArticleInDb(data);

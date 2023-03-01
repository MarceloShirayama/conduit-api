import * as article from "../../use-cases/article";
import * as comment from "../../use-cases/comment";
import * as user from "../../use-cases/user";
import * as dbInMemory from "../db-in-memory";

export const createUserInDB: user.OutsideRegisterUser = (data) =>
  dbInMemory.outsideRegisterUser(data);

export const createArticleInDB: article.OutsideRegisterArticle = (data) =>
  dbInMemory.outsideRegisterArticle(data);

export const addCommentToAnArticleInDB: comment.OutsideAddCommentToAnArticle = (
  data
) => dbInMemory.outsideAddCommentToAnArticle(data);

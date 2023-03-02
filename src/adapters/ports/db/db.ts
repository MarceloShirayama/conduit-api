import * as article from "../../use-cases/article";
import * as comment from "../../use-cases/comment";
import * as user from "../../use-cases/user";
import * as dbInMemory from "../db-in-memory";
import * as jwt from "./../jwt";

export const createUserInDB: user.OutsideRegisterUser = async (data) => {
  const token = await jwt.generateToken({ id: 1 });

  return dbInMemory.outsideRegisterUser({ ...data, token });
};

export const createArticleInDB: article.OutsideRegisterArticle = (data) =>
  dbInMemory.outsideRegisterArticle(data);

export const addCommentToAnArticleInDB: comment.OutsideAddCommentToAnArticle = (
  data
) => dbInMemory.outsideAddCommentToAnArticle(data);

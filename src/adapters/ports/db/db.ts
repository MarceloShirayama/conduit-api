import {
  OutsideAddCommentToAnArticle,
  OutsideRegisterArticle,
} from "../../use-cases/article";
import { OutsideRegisterUser } from "../../use-cases/user";
import {
  outsideAddCommentToAnArticle,
  outsideRegister,
  outsideRegisterArticle,
} from "../db-in-memory";

export const createUserInDB: OutsideRegisterUser = (data) =>
  outsideRegister(data);

export const createArticleInDB: OutsideRegisterArticle = (data) =>
  outsideRegisterArticle(data);

export const addCommentToAnArticleInDB: OutsideAddCommentToAnArticle = (data) =>
  outsideAddCommentToAnArticle(data);

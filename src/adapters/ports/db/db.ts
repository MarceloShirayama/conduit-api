import { OutsideRegisterUser } from "../../use-cases/user/register-user-adapter";
import { OutsideRegisterArticle } from "../../use-cases/article/register-article-adapter";
import {
  outsideAddCommentToAnArticle,
  outsideRegister,
  outsideRegisterArticle,
} from "../db-in-memory";
import { OutsideAddCommentToAnArticle } from "../../use-cases/article/add-comment-to-an-article-adapter";

export const createUserInDB: OutsideRegisterUser = (data) =>
  outsideRegister(data);

export const createArticleInDB: OutsideRegisterArticle = (data) =>
  outsideRegisterArticle(data);

export const addCommentToAnArticleInDB: OutsideAddCommentToAnArticle = (data) =>
  outsideAddCommentToAnArticle(data);

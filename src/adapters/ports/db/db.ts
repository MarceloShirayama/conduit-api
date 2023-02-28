import { OutsideRegisterUser } from "../../use-cases/user/register-user-adapter";
import { OutsideRegisterArticle } from "../../use-cases/article/register-article-adapter";
import { outsideRegister, outsideRegisterArticle } from "../db-in-memory";

export const createUserInDB: OutsideRegisterUser = (data) => {
  return outsideRegister(data);
};

export const createArticleInDB: OutsideRegisterArticle = (data) => {
  return outsideRegisterArticle(data);
};

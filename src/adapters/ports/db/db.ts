import { OutsideRegisterType } from "../../use-cases/user/register-user-adapter";
import { OutsideRegisterType as OutsideRegisterArticleType } from "../../use-cases/article/register-article-adapter";
import { outsideRegister, outsideRegisterArticle } from "../db-in-memory";

export const createUserInDB: OutsideRegisterType = (data) => {
  return outsideRegister(data);
};

export const createArticleInDB: OutsideRegisterArticleType = (data) => {
  return outsideRegisterArticle(data);
};

import { OutsideRegisterType } from "../../use-cases/user/register-user-adapter";
import { OutsideRegisterType as OutsideRegisterArticleType } from "../../use-cases/article/register-article-adapter";
import { outsideRegister, outsideRegisterArticle } from "../db-in-memory";

export const userRegister: OutsideRegisterType = (data) => {
  return outsideRegister(data);
};

export const articleRegister: OutsideRegisterArticleType = (data) => {
  return outsideRegisterArticle(data);
};

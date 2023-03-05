import { OutsideRegisterArticle } from "../../use-cases/article";
import { createArticleInDB } from "./db";

export const createArticle: OutsideRegisterArticle = async (data) => {
  const articleRegistered = await createArticleInDB(data);

  return {
    article: articleRegistered,
  };
};

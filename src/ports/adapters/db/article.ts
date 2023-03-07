import { OutsideRegisterArticle } from "../../../core/article/use-cases";
import { createArticleInDB } from "./db";

export const createArticle = <OutsideRegisterArticle>(async (data) => {
  const articleRegistered = await createArticleInDB(data);

  return {
    article: articleRegistered,
  };
});

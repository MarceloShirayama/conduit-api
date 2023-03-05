import { OutsideAddCommentToAnArticle } from "../../use-cases/comment";
import { addCommentToAnArticleInDb } from "./db";

export const addCommentToAnArticle: OutsideAddCommentToAnArticle = async (
  data
) => {
  const registeredComment = await addCommentToAnArticleInDb(data);

  const { articleId, authorId, ...comment } = registeredComment;

  return {
    comment,
  };
};

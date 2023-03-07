import { OutsideAddCommentToAnArticle } from "../../../core/comment/use-cases";
import { addCommentToAnArticleInDb } from "./db";

export const addCommentToAnArticle = <OutsideAddCommentToAnArticle>(async (
  data
) => {
  const registeredComment = await addCommentToAnArticleInDb(data);

  const { articleId, authorId, ...comment } = registeredComment;

  return {
    comment,
  };
});

import * as comment from "../../use-cases/comment";

export const addCommentToAnArticleInDb: comment.OutsideAddCommentToAnArticle =
  async (data) => {
    const dateNow = new Date();
    const dateString = dateNow.toISOString();
    const dateNumber = dateNow.getTime();

    return {
      comment: {
        // TODO: use uuid in id
        id: dateNumber,
        createdAt: dateString,
        updatedAt: dateString,
        body: data.body,
        // author: {
        //   username: "jake",
        //   bio: "I work at statefarm",
        //   image: "https://i.stack.imgur.com/xHWG8.jpg",
        //   following: false,
        // },
      },
    };
  };

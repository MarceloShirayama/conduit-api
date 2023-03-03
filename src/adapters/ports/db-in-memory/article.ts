import slugify from "slugify";

import * as article from "../../use-cases/article";

export const createArticleInDB: article.OutsideRegisterArticle = async (
  data
) => {
  const dateNow = new Date().toISOString();

  return {
    article: {
      slug: slugify(data.title, { lower: true }),
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList ?? [],
      createdAt: dateNow,
      updatedAt: dateNow,
      favorited: false,
      favoritesCount: 0,
      // author: {
      //   bio: "",
      //   following: false,
      //   image: "",
      //   username: "",
      // },
    },
  };
};

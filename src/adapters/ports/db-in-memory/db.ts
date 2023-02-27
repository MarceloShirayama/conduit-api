import slugify from "slugify";

import { OutsideRegisterType } from "../../use-cases/user/register-user-adapter";
import { OutsideRegisterType as OutsideRegisterArticleType } from "../../use-cases/article/register-article-adapter";

export const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    user: {
      email: data.email,
      username: data.username,
      token: "",
      bio: "",
      image: undefined,
    },
  };
};

export const outsideRegisterArticle: OutsideRegisterArticleType = async (
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

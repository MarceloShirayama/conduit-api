import slugify from "slugify";

import { OutsideRegisterUser } from "../../use-cases/user/register-user-adapter";
import { OutsideRegisterArticle } from "../../use-cases/article/register-article-adapter";

export const outsideRegister: OutsideRegisterUser = async (data) => {
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

export const outsideRegisterArticle: OutsideRegisterArticle = async (data) => {
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

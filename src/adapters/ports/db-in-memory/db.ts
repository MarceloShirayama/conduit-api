import slugify from "slugify";

import { OutsideRegisterUser } from "../../use-cases/user/register-user-adapter";
import { OutsideRegisterArticle } from "../../use-cases/article/register-article-adapter";
import { OutsideAddCommentToAnArticle } from "../../use-cases/article/add-comment-to-an-article-adapter";

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

export const outsideAddCommentToAnArticle: OutsideAddCommentToAnArticle =
  async (data) => {
    const dateNow = new Date().toISOString();

    return {
      comment: {
        // TODO: use uuid in id
        id: 1,
        createdAt: dateNow,
        updatedAt: dateNow,
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

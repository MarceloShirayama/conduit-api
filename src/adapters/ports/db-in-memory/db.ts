import slugify from "slugify";
import { v4 as uuidV4 } from "uuid";

import * as article from "../../use-cases/article";
import * as comment from "../../use-cases/comment";
import * as user from "../../use-cases/user";

type DB = {
  users: {
    [id: string]: user.DBUser;
  };
};

const db: DB = {
  users: {},
};

export const outsideRegisterUserInDB: user.OutsideRegisterUserInDB = async (
  data
) => {
  const id = uuidV4();

  db.users[id] = {
    id,
    email: data.email,
    username: data.username,
    password: data.password,
  };

  return db.users[id];
};

export const outsideRegisterArticleInDB: article.OutsideRegisterArticle =
  async (data) => {
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

export const outsideAddCommentToAnArticleInDb: comment.OutsideAddCommentToAnArticle =
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

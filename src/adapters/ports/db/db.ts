import * as article from "../../use-cases/article";
import * as comment from "../../use-cases/comment";
import * as user from "../../use-cases/user";
import * as dbInMemory from "../db-in-memory";
import * as jwt from "./../jwt";

export const createUser: user.OutsideRegisterUser = async (data) => {
  const registeredUser = await dbInMemory.createUserInDB(data);

  if (!registeredUser) throw new Error("Error registering user!");

  const token = await jwt.generateToken({ id: registeredUser.id });

  return {
    user: {
      username: registeredUser.username,
      email: registeredUser.email,
      bio: "",
      image: undefined,
      token,
    },
  };
};

export const createArticle: article.OutsideRegisterArticle = (data) =>
  dbInMemory.createArticleInDB(data);

export const addCommentToAnArticle: comment.OutsideAddCommentToAnArticle = (
  data
) => dbInMemory.addCommentToAnArticleInDb(data);

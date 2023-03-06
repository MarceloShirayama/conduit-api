import { pipe } from "fp-ts/lib/function";

import { mapAll, unsafe } from "../../../config/test/fixtures";
import { OutsideFunction } from "../../ports";
import { CreateArticleType } from "../types";
import { registerArticle } from "./register-article";

describe("Register article use case", () => {
  const datas: CreateArticleType[] = [
    {
      title: "any title",
      description: "any description",
      body: "any body",
      authorId: unsafe("61f84b62-f81f-4f09-8632-ac1f8e6ef93a"),
    },
    {
      title: "any title 2",
      description: "any description 2",
      body: "any body 2",
      tagList: ["any-tag"],
      authorId: unsafe("61f84b62-f81f-4f09-8632-ac1f8e6ef93a"),
    },
  ];

  const dataWithWrongTagList: CreateArticleType = {
    title: "any title",
    description: "any description",
    body: "any body",
    tagList: ["-invalid-slug"],
    authorId: unsafe("61f84b62-f81f-4f09-8632-ac1f8e6ef93a"),
  };

  const dataWithWrongTitleAndDescription: CreateArticleType = {
    title: "",
    description: "",
    body: "any body",
    authorId: unsafe("61f84b62-f81f-4f09-8632-ac1f8e6ef93a"),
  };

  const dataWithWrongBody: CreateArticleType = {
    title: "any title",
    description: "any description",
    body: unsafe(1),
    tagList: ["any-tag"],
    authorId: unsafe("61f84b62-f81f-4f09-8632-ac1f8e6ef93a"),
  };

  const dataWithWrongAuthorId: CreateArticleType = {
    title: "any title",
    description: "any description",
    body: "any body",
    authorId: unsafe("123"),
  };

  const registerOk: OutsideFunction<CreateArticleType, string> = async (
    data: CreateArticleType
  ) => `Article ${data.title} successfully created!`;

  const registerFail: OutsideFunction<unknown, never> = async (_data) => {
    throw new Error("External error!");
  };

  it.each(datas)("Should create an article properly", (validArticleData) => {
    pipe(
      validArticleData,
      registerArticle(registerOk),
      mapAll((result) =>
        expect(result).toBe(
          `Article ${validArticleData.title} successfully created!`
        )
      )
    )();
  });

  it("Should not accept a register from an article with invalid tagList", () => {
    pipe(
      dataWithWrongTagList,
      registerArticle(registerOk),
      mapAll((error) =>
        expect(error).toEqual(
          new Error(
            "Invalid Tag. Please, use alphanumeric characters, dash and/or numbers."
          )
        )
      )
    )();
  });

  it("Should not accept a register from an article with invalid title and description", () => {
    pipe(
      dataWithWrongTitleAndDescription,
      registerArticle(registerOk),
      mapAll((error) =>
        expect(error).toEqual(
          new Error("Invalid Title.:::Invalid Description.")
        )
      )
    )();
  });

  it("Should not accept a register from an article with invalid body", () => {
    pipe(
      dataWithWrongBody,
      registerArticle(registerOk),
      mapAll((error) => expect(error).toEqual(new Error("Invalid Body.")))
    )();
  });

  it("Should not accept a register from an article with invalid author id", () => {
    pipe(
      dataWithWrongAuthorId,
      registerArticle(registerOk),
      mapAll((error) => expect(error).toEqual(new Error("Invalid author id.")))
    )();
  });

  it("Should return left if register function throws an error", () => {
    pipe(
      datas[0],
      registerArticle(registerFail),
      mapAll((error) => expect(error).toEqual(new Error("External error!")))
    )();
  });
});

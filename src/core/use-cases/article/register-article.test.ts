import { pipe } from "fp-ts/lib/function";

import { mapAll, unsafe } from "../../../test/config/fixtures";
import { CreateArticleType } from "../../types";
import { OutsideRegister, registerArticle } from "./register-article";

describe("Register article use case", () => {
  const datas: CreateArticleType[] = [
    {
      title: "any title",
      description: "any description",
      body: "any body",
    },
    {
      title: "any title 2",
      description: "any description 2",
      body: "any body 2",
      tagList: ["any-tag"],
    },
  ];

  const dataWithWrongTagList: CreateArticleType = {
    title: "any title",
    description: "any description",
    body: "any body",
    tagList: ["-invalid-slug"],
  };

  const dataWithWrongTitleAndDescription: CreateArticleType = {
    title: "",
    description: "",
    body: "any body",
  };

  const dataWithWrongBody: CreateArticleType = {
    title: "any title",
    description: "any description",
    body: unsafe(1),
    tagList: ["any-tag"],
  };

  const registerOk: OutsideRegister<string> = async (data: CreateArticleType) =>
    `Article ${data.title} successfully created!`;

  const registerFail: OutsideRegister<never> = async (_data) => {
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

  it("Should return left if register function throws an error", () => {
    pipe(
      datas[0],
      registerArticle(registerFail),
      mapAll((error) => expect(error).toEqual(new Error("External error!")))
    )();
  });
});

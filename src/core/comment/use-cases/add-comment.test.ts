import { pipe } from "fp-ts/lib/function";

import { mapAll, unsafe } from "../../../config/test/fixtures";
import { OutsideFunction } from "../../ports";
import { CreateCommentType } from "../types";
import { addCommentToAnArticle } from "./";

describe("Add comment use case", () => {
  const datas: CreateCommentType[] = [
    {
      authorId: unsafe("1e3c9e90-8f1d-4619-9934-250ca05b7539"),
      articleSlug: unsafe("any-slug"),
      body: "New comment added to an article.",
    },
  ];

  const dataWithEmptyBody: CreateCommentType = {
    authorId: unsafe("1e3c9e90-8f1d-4619-9934-250ca05b7539"),
    articleSlug: unsafe("any-slug"),
    body: "",
  };

  const dataWithCommentThatIsNotString: CreateCommentType = {
    authorId: unsafe("1e3c9e90-8f1d-4619-9934-250ca05b7539"),
    articleSlug: unsafe("any-slug"),
    body: unsafe(10),
  };

  const dataWithInvalidAuthorId: CreateCommentType = {
    authorId: unsafe("12345"),
    articleSlug: unsafe("any-slug"),
    body: "New comment added to an article.",
  };

  const dataWithInvalidSlug: CreateCommentType = {
    authorId: unsafe("1e3c9e90-8f1d-4619-9934-250ca05b7539"),
    articleSlug: unsafe("-any-slug"),
    body: "New comment added to an article.",
  };

  const addCommentOK: OutsideFunction<CreateCommentType, string> = async (
    data
  ) => {
    return `Comment "${data.body}" added successfully.`;
  };

  const addCommentFail: OutsideFunction<unknown, never> = async (_data) => {
    throw new Error("External error!");
  };

  it.each(datas)("Should add comment to an article properly", (data) => {
    pipe(
      data,
      addCommentToAnArticle(addCommentOK),
      mapAll((result) =>
        expect(result).toBe(`Comment "${data.body}" added successfully.`)
      )
    )();
  });

  it("Should not accept an empty comment", () => {
    pipe(
      dataWithEmptyBody,
      addCommentToAnArticle(addCommentOK),
      mapAll((error) => expect(error).toEqual(new Error("Invalid Body.")))
    )();
  });

  it("Should not accept a comment that is not a string", () => {
    pipe(
      dataWithCommentThatIsNotString,
      addCommentToAnArticle(addCommentOK),
      mapAll((error) => expect(error).toEqual(new Error("Invalid Body.")))
    )();
  });

  it("Should not accept a comment with invalid author id", () => {
    pipe(
      dataWithInvalidAuthorId,
      addCommentToAnArticle(addCommentOK),
      mapAll((error) => expect(error).toEqual(new Error("Invalid author id.")))
    )();
  });

  it("Should not accept a comment with invalid slug", () => {
    pipe(
      dataWithInvalidSlug,
      addCommentToAnArticle(addCommentOK),
      mapAll((error) =>
        expect(error).toEqual(
          new Error(
            "Invalid slug. Please, use alphanumeric characters, dash and/or numbers."
          )
        )
      )
    )();
  });

  it("Should not create comment if outsideCreateComment function throws an error", () => {
    pipe(
      datas[0],
      addCommentToAnArticle(addCommentFail),
      mapAll((error) => expect(error).toEqual(new Error("External error!")))
    )();
  });
});

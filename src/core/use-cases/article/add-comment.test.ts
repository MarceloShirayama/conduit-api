import { pipe } from "fp-ts/lib/function";

import { mapAll, unsafe } from "../../../test/config/fixtures";
import { CreateCommentType } from "./../../types";
import { addCommentToAnArticle, OutsideCreateComment } from "./add-comment";

describe("Add comment use case", () => {
  const datas: CreateCommentType[] = [
    {
      body: "New comment added to an article.",
    },
  ];

  const dataWithEmptyBody: CreateCommentType = {
    body: "",
  };

  const dataWithCommentThatIsNotString: CreateCommentType = {
    body: unsafe(10),
  };

  const addCommentOK: OutsideCreateComment<string> = async (data) => {
    return `Comment "${data.body}" added successfully.`;
  };

  const addCommentFail: OutsideCreateComment<never> = async (data) => {
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

  it("Should not create comment if outsideCreateComment function throws an error", () => {
    pipe(
      datas[0],
      addCommentToAnArticle(addCommentFail),
      mapAll((error) => expect(error).toEqual(new Error("External error!")))
    )();
  });
});

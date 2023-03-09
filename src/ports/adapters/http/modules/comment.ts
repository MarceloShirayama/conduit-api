import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { CommentType, CreateCommentType } from "../../../../core/comment/types";
import { addCommentToAnArticleAdapter } from "../../../../core/comment/use-cases";
import { addCommentToAnArticle } from "../../db";
import { getError } from "../http";

type AddCommentToAnArticleRequest = {
  comment: CommentType;
};

type AddCommentToAnArticleResponse = {
  comment: CommentType;
};

type AddCommentToAnArticleHttp = (
  input: AddCommentToAnArticleRequest
) => AddCommentToAnArticleResponse;

const addCommentToAnArticleHttp = <AddCommentToAnArticleHttp>(({
  comment,
}) => ({
  comment,
}));

export const addCommentToAnArticleHttpAdapter = (data: CreateCommentType) => {
  return pipe(
    data,
    addCommentToAnArticleAdapter(addCommentToAnArticle),
    TE.map(addCommentToAnArticleHttp),
    TE.mapLeft((error) => getError(error.message))
  );
};

import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { registerArticleAdapter } from "../../../../core/article/use-cases";
import { ArticleType, CreateArticleType } from "../../../../core/article/types";
import { createArticle } from "../../db";
import { getError } from "../http";

type CreateArticleRequest = {
  article: ArticleType;
};

type CreateArticleResponse = {
  article: ArticleType;
};

type CreateArticleHttp = (input: CreateArticleRequest) => CreateArticleResponse;

const createArticleHttp = <CreateArticleHttp>(({ article }) => ({ article }));

export const createArticleHttpAdapter = (data: CreateArticleType) => {
  return pipe(
    data,
    registerArticleAdapter(createArticle),
    TE.map(createArticleHttp),
    TE.mapLeft((error) => getError(error.message))
  );
};

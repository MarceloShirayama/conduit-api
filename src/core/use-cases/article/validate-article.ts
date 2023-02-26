import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { failure } from "io-ts/PathReporter";

import { CreateArticleType } from "../../types";

export type ValidateArticle = (
  data: CreateArticleType
) => E.Either<Error, unknown>;

export const validateArticle: ValidateArticle = (data) => {
  return pipe(
    data,
    CreateArticleType.decode,
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
};

import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { failure } from "io-ts/PathReporter";

import { ValidateType } from "../../ports";
import { CreateArticleType } from "../types";

export const validateArticle: ValidateType<CreateArticleType> = (data) => {
  return pipe(
    data,
    CreateArticleType.decode,
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
};

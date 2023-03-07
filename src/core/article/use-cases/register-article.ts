import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { OutsideFunction } from "../../ports";
import { CreateArticleType } from "../types";
import { validateArticle } from "./validate-article";

export type RegisterArticle = <A>(
  outsideRegister: OutsideFunction<CreateArticleType, A>
) => (data: CreateArticleType) => TE.TaskEither<Error, A>;

export const registerArticle = <RegisterArticle>((outsideRegister) =>
  (data) => {
    return pipe(
      data,
      validateArticle,
      TE.fromEither,
      TE.chain(() => TE.tryCatch(() => outsideRegister(data), E.toError))
    );
  });

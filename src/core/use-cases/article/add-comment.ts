import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { CreateCommentType } from "../../types";
import { validateComment } from "./validate-comment";

export type OutsideCreateComment<A> = (data: CreateCommentType) => Promise<A>;

export type AddCommentToAnArticle = <A>(
  outsideCreateComment: OutsideCreateComment<A>
) => (data: CreateCommentType) => TE.TaskEither<Error, A>;

export const addCommentToAnArticle: AddCommentToAnArticle =
  (outsideAddComment) => (data) => {
    return pipe(
      data,
      validateComment,
      TE.fromEither,
      TE.chain(() => TE.tryCatch(() => outsideAddComment(data), E.toError))
    );
  };

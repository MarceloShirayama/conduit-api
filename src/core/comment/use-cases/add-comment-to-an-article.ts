import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { CreateCommentType } from "../types";
import { OutsideFunction } from "../../ports";
import { validateComment } from "./validate-comment";

export type AddCommentToAnArticle = <A>(
  outsideCreateComment: OutsideFunction<CreateCommentType, A>
) => (data: CreateCommentType) => TE.TaskEither<Error, A>;

export const addCommentToAnArticle = <AddCommentToAnArticle>((
    outsideAddComment
  ) =>
  (data) => {
    return pipe(
      data,
      validateComment,
      TE.fromEither,
      TE.chain(() => TE.tryCatch(() => outsideAddComment(data), E.toError))
    );
  });

import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { failure } from "io-ts/lib/PathReporter";

import { CreateCommentType } from "../../types";

export type ValidateComment = (
  data: CreateCommentType
) => E.Either<Error, unknown>;

export const validateComment: ValidateComment = (data) => {
  return pipe(
    data,
    CreateCommentType.decode,
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
};

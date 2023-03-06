import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { failure } from "io-ts/lib/PathReporter";

import { CreateCommentType } from "../../types";
import { ValidateType } from "../../ports";

export const validateComment: ValidateType<CreateCommentType> = (data) => {
  return pipe(
    data,
    CreateCommentType.decode,
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
};

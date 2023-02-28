import * as E from "fp-ts/Either";

export type ValidateType<T> = (data: T) => E.Either<Error, unknown>;

import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { NonEmptyString, withMessage } from "io-ts-types";
import { failure } from "io-ts/lib/PathReporter";

export const getEnvironmentVariable = (variable: string) => {
  const EnvType = withMessage(
    NonEmptyString,
    () => `You must set the environment variable ${variable}`
  );

  return pipe(
    EnvType.decode(process.env[variable]),
    E.fold(
      (errors) => {
        throw new Error(failure(errors).join(":::"));
      },
      (value) => value
    )
  );
};

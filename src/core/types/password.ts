import * as t from "io-ts";

export const PasswordType = new t.Type<string, string, unknown>(
  "PasswordType",
  (input: unknown): input is string =>
    typeof input === "string" && isPassword(input),
  (input, context) =>
    typeof input === "string" && isPassword(input)
      ? t.success(input)
      : t.failure(
          input,
          context,
          "Invalid password. Password must contain at least 8 characters."
        ),
  t.identity
);

export type PasswordType = t.TypeOf<typeof PasswordType>;

function isPassword(value: string) {
  return value.length >= 8;
}

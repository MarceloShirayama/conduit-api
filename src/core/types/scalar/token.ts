import * as t from "io-ts";

export const TokenType = new t.Type<string, string, unknown>(
  "TokenType",
  (input: unknown): input is string =>
    typeof input === "string" && isToken(input),
  (input, context) =>
    typeof input === "string" && isToken(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid token."),
  t.identity
);

export type TokenType = t.TypeOf<typeof TokenType>;

export function isToken(value: string) {
  return value.length > 0;
}

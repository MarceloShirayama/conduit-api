import * as t from "io-ts";

export const SlugType = new t.Type<string, string, unknown>(
  "SlugType",
  (input: unknown): input is string =>
    typeof input === "string" && isSlug(input),
  (input, context) =>
    typeof input === "string" && isSlug(input)
      ? t.success(input)
      : t.failure(
          input,
          context,
          "Invalid slug. Please, use alphanumeric characters, dash and/or numbers."
        ),
  t.identity
);

export type SlugType = t.TypeOf<typeof SlugType>;

export function isSlug(value: string) {
  /**
   * Accept
   * - alphanumeric characters, dash and/or numbers
   * Not accept
   * - starts with number or dash
   * - finish with dash
   * - less than 3 character
   * - consecutive dash dash
   */

  const match = /^[a-z][a-z0-9-]+[a-z0-9]$/.test(value) && !/-{2}/g.test(value);

  return match;
}

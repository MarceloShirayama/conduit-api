import * as t from "io-ts";

export const TagType = new t.Type<string, string, unknown>(
  "TagType",
  (input: unknown): input is string =>
    typeof input === "string" && isTag(input),
  (input, context) =>
    typeof input === "string" && isTag(input)
      ? t.success(input)
      : t.failure(
          input,
          context,
          "Invalid Tag. Please, use alphanumeric characters, dash and/or numbers."
        ),
  t.identity
);

export type TagType = t.TypeOf<typeof TagType>;

export function isTag(value: string) {
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

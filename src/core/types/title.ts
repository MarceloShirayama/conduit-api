import * as t from "io-ts";

export const TitleType = new t.Type<string, string, unknown>(
  "TitleType",
  (input: unknown): input is string =>
    typeof input === "string" && isTitle(input),
  (input, context) =>
    typeof input === "string" && isTitle(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid Title."),
  t.identity
);

export type TitleType = t.TypeOf<typeof TitleType>;

export function isTitle(value: string) {
  return value.length > 0;
}

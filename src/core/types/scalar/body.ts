import * as t from "io-ts";

export const BodyType = new t.Type<string, string, unknown>(
  "BodyType",
  (input: unknown): input is string =>
    typeof input === "string" && isBody(input),
  (input, context) =>
    typeof input === "string" && isBody(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid Body."),
  t.identity
);

export type BodyType = t.TypeOf<typeof BodyType>;

export function isBody(value: string) {
  return value.length > 0;
}

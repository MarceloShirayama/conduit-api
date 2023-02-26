import * as t from "io-ts";
import { URL } from "node:url";

export const ImageUrlType = new t.Type<string, string, unknown>(
  "ImageUrlType",
  (input: unknown): input is string =>
    typeof input === "string" && isUrl(input),
  (input, context) =>
    typeof input === "string" && isUrl(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid image url."),
  t.identity
);

export type ImageUrlType = t.TypeOf<typeof ImageUrlType>;

export function isUrl(value: string) {
  try {
    const url = new URL(typeof value === "string" ? value : "");
    return !!url;
  } catch {
    return false;
  }
}

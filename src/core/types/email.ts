import * as t from "io-ts";

export const EmailType = new t.Type<string, string, unknown>(
  "EmailType",
  (input: unknown): input is string =>
    typeof input === "string" && isEmail(input),
  (input, context) =>
    typeof input === "string" && isEmail(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid email."),
  t.identity
);

export type EmailType = t.TypeOf<typeof EmailType>;

export function isEmail(value: string) {
  return /^\w+.+?@\w+.+?$/.test(value);
}

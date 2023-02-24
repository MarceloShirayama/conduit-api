import * as t from "io-ts";

export const email = new t.Type<string, string, unknown>(
  "Email",
  (input: unknown): input is string =>
    typeof input === "string" && isEmail(input),
  (input, context) =>
    typeof input === "string" && isEmail(input)
      ? t.success(input)
      : t.failure(input, context, `${input} is Invalid email.`),
  t.identity
);

export type Email = t.TypeOf<typeof email>;

export function isEmail(value: string) {
  return /^\w+.+?@\w+.+?$/.test(value);
}

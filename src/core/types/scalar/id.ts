import * as t from "io-ts";

export const IdType = new t.Type<number, number, unknown>(
  "IdType",
  (input: unknown): input is number => typeof input === "number" && isId(input),
  (input, context) =>
    typeof input === "number" && isId(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid Id."),
  t.identity
);

export type IdType = t.TypeOf<typeof IdType>;

export function isId(value: number) {
  return value > 0;
}

import * as t from "io-ts";

export const PositiveType = new t.Type<number, number, unknown>(
  "PositiveType",
  (input: unknown): input is number =>
    typeof input === "number" && isPositive(input),
  (input, context) =>
    typeof input === "number" && isPositive(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid Positive."),
  t.identity
);

export type PositiveType = t.TypeOf<typeof PositiveType>;

export function isPositive(value: number) {
  return value >= 0;
}

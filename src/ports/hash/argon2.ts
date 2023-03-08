import argon2 from "argon2";

export const hash = async (plain: string) => {
  return argon2.hash(plain);
};

export const verify = async (hash: string, plain: string) => {
  return argon2.verify(hash, plain);
};

import { hash, verify } from "../../hash/argon2";

export const hashPassword = async (plain: string) => {
  const hashPassword = await hash(plain);

  return hashPassword;
};

export const checkPassword = async (hash: string, plain: string) => {
  return verify(hash, plain);
};

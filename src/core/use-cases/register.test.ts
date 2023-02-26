import { pipe } from "fp-ts/function";

import { mapAll } from "../../test/config/fixtures";
import { CreateUserType } from "../types";
import { OutsideRegister, register } from "./";

describe("Register use case", () => {
  const registerOk: OutsideRegister<string> = async (data) => {
    return `Usuário ${data.username} cadastrado com sucesso!`;
  };

  const registerFail: OutsideRegister<never> = async (data) => {
    throw new Error("External error!");
  };

  const data: CreateUserType = {
    username: "john",
    email: "john@mail.com",
    password: "valid-password",
  };

  const dataWithWrongUsername: CreateUserType = {
    username: "a",
    email: "john@mail.com",
    password: "valid-password",
  };

  const dataWithWrongEmailAndPassword: CreateUserType = {
    username: "john",
    email: "invalid_mail",
    password: "i".repeat(7),
  };

  it("Should register an user with success", () => {
    pipe(
      data,
      register(registerOk),
      mapAll((result) =>
        expect(result).toBe(`Usuário ${data.username} cadastrado com sucesso!`)
      )
    )();
  });

  it("Should not accept a register from an user with invalid username", () => {
    pipe(
      dataWithWrongUsername,
      register(registerOk),
      mapAll((error) =>
        expect(error).toEqual(
          new Error(
            "Invalid slug. Please, use alphanumeric characters, dash and/or numbers."
          )
        )
      )
    )();
  });

  it("Should not accept a register from an user with invalid email and password", () => {
    pipe(
      dataWithWrongEmailAndPassword,
      register(registerOk),
      mapAll((error) =>
        expect(error).toEqual(
          new Error(
            "Invalid email.:::Invalid password. Password must contain at least 8 characters."
          )
        )
      )
    )();
  });

  it("Should return left if register function throws an error", () => {
    pipe(
      data,
      register(registerFail),
      mapAll((error) => expect(error).toEqual(new Error("External error!")))
    )();
  });
});

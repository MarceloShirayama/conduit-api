import { pipe } from "fp-ts/lib/function";

import { OutsideFunction } from "../../ports";
import { LoginUserType } from "../types";
import { loginUser } from "./login-user";
import { mapAll } from "../../../config/test/fixtures";

describe("Login user use case", () => {
  const loginOk = <OutsideFunction<LoginUserType, string>>(async (data) => {
    return `Acesso do usuário com email ${data.email} efetuado com sucesso.`;
  });

  const loginFail = <OutsideFunction<unknown, never>>(async (data) => {
    throw new Error("External error!");
  });

  const data: LoginUserType = {
    email: "john@mail.com",
    password: "valid-password",
  };

  const dataWithInvalidEmail: LoginUserType = {
    email: "invalid-mail.com",
    password: "valid-password",
  };

  const dataWithInvalidPassword: LoginUserType = {
    email: "john@mail.com",
    password: "invalid",
  };

  it("Should be able login user if email and password are correct", () => {
    pipe(
      data,
      loginUser(loginOk),
      mapAll((result) =>
        expect(result).toBe(
          `Acesso do usuário com email ${data.email} efetuado com sucesso.`
        )
      )
    )();
  });

  it("Should not be able login user if email is invalid", () => {
    pipe(
      dataWithInvalidEmail,
      loginUser(loginOk),
      mapAll((error) => expect(error).toEqual(new Error("Invalid email.")))
    )();
  });

  it("Should not be able login user if password is invalid", () => {
    pipe(
      dataWithInvalidPassword,
      loginUser(loginOk),
      mapAll((error) =>
        expect(error).toEqual(
          new Error(
            "Invalid password. Password must contain at least 8 characters."
          )
        )
      )
    )();
  });

  it("Should return left if login function throws an error", () => {
    pipe(
      data,
      loginUser(loginFail),
      mapAll((error) => expect(error).toEqual(new Error("External error!")))
    )();
  });
});

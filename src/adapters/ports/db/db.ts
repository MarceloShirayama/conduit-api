import { OutsideRegisterType } from "../../use-cases/user/register-user-adapter";
import { outsideRegister } from "../db-in-memory";

export const userRegister: OutsideRegisterType = (data) => {
  return outsideRegister(data);
};

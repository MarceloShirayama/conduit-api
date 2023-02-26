import { OutsideRegisterType } from "../../../adapters/use-cases/user/register-adapter";
import { outsideRegister } from "../db-in-memory";

export const userRegister: OutsideRegisterType = (data) => {
  return outsideRegister(data);
};

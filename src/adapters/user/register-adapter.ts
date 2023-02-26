import { CreateUserType } from "../../core/types";
import {
  OutsideRegister,
  Register,
  register as registerCore,
} from "../../core/use-cases/register";

export type OutsideRegisterType = OutsideRegister<{
  success: boolean;
  data: CreateUserType;
}>;

export const register: Register = (outsideRegister) => (data) =>
  registerCore(outsideRegister)(data);

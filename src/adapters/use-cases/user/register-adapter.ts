import { UserType } from "../../../core/types";
import {
  OutsideRegister,
  Register,
  register as registerCore,
} from "../../../core/use-cases/user/register";

export type OutsideRegisterType = OutsideRegister<{ user: UserType }>;

export const register: Register = (outsideRegister) => (data) =>
  registerCore(outsideRegister)(data);

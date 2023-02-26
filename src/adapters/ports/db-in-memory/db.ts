import { OutsideRegisterType } from "../../use-cases/user/register-adapter";

export const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    success: true,
    data,
  };
};

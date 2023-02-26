import { OutsideRegisterType } from "../../use-cases/user/register-adapter";

export const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    user: {
      email: data.email,
      username: data.username,
      token: "",
      bio: "",
      image: undefined,
    },
  };
};

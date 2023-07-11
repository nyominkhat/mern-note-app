import { useMutation } from "@tanstack/react-query";

import userLogin from "../../service/auths/userLogin";

const useUserLogin = () => {
  return useMutation(userLogin);
};

export default useUserLogin;

import { useMutation } from "@tanstack/react-query";

import userSignup from "../../service/auths/userSignup";

const useUserSignup = () => {
  return useMutation(userSignup);
};

export default useUserSignup;

import axios from "axios";

import URL from "../../helpers/getBaseUrl";

interface UserDataProps {
  username: string;
  password: string;
}

const userLogin = async (data: UserDataProps) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, {
      username: data.username,
      password: data.password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default userLogin;

import axios from "axios";

import URL from "../../helpers/getBaseUrl";

interface UserDataProps {
  username: string;
  email: string;
  password: string;
}

const userSignup = async (data: UserDataProps) => {
  try {
    const response = await axios.post(`${URL}/auth/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default userSignup;

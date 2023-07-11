import axios from "axios";

import URL from "../../helpers/getBaseUrl";
import getToken from "../../helpers/getToken";

const getNotes = async () => {
  const token = getToken();

  try {
    const response = await axios.get(`${URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default getNotes;

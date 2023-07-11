import axios from "axios";

import getToken from "../../helpers/getToken";
import URL from "../../helpers/getBaseUrl";

const getNote = async (noteId: string) => {
  const token = getToken();

  try {
    const response = await axios.get(`${URL}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default getNote;

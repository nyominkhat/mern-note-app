import axios from "axios";

import URL from "../../helpers/getBaseUrl";
import getToken from "../../helpers/getToken";

const deleteNote = async (noteId: string) => {
  const token = getToken();

  try {
    const response = await axios.delete(`${URL}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default deleteNote;

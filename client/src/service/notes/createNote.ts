import axios from "axios";

import URL from "../../helpers/getBaseUrl";
import getToken from "../../helpers/getToken";

interface NoteDataProps {
  title: string;
  text: string;
}

const createNote = async (data: NoteDataProps) => {
  const token = getToken();

  try {
    const response = await axios.post(
      `${URL}/notes`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default createNote;

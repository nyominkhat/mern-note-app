import axios from "axios";

import URL from "../../helpers/getBaseUrl";
import getToken from "../../helpers/getToken";

interface NoteDataProps {
  title: string;
  text: string;
  noteId: string;
}

const updateNote = async (data: NoteDataProps) => {
  const token = getToken();

  try {
    const response = await axios.patch(
      `${URL}/notes/${data.noteId}`,
      {
        title: data.title,
        text: data.text,
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

export default updateNote;

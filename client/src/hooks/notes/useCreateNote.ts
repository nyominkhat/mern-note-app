import { useMutation } from "@tanstack/react-query";

import createNote from "../../service/notes/createNote";

const useCreateNote = () => {
  return useMutation(createNote);
};

export default useCreateNote;

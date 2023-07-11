import { useMutation } from "@tanstack/react-query";

import updateNote from "../../service/notes/updateNote";

const useUpdateNote = () => {
  return useMutation(updateNote);
};


export default useUpdateNote
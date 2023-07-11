import { useMutation } from "@tanstack/react-query";
import deleteNote from "../../service/notes/deleteNote";

const useDeleteNote = () => {
  return useMutation(deleteNote);
};

export default useDeleteNote;

import { useQuery } from "@tanstack/react-query";
import getNote from "../../service/notes/getNote";

const useGetNote = (noteId: string) => {
  return useQuery(["getNote"], () => getNote(noteId));
};

export default useGetNote;

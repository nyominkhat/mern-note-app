import { useQuery } from "@tanstack/react-query";
import getNotes from "../../service/notes/getNotes";

const useGetNotes = () => {
  return useQuery(["getNotes"], getNotes);
};

export default useGetNotes;

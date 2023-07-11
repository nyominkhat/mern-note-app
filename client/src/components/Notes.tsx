import { PuffLoader } from "react-spinners";

import Note from "./Note";
import useGetNotes from "../hooks/notes/useGetNotes";
import { NoteProps } from "../types";

const Notes = () => {
  const { data: notesId, refetch, isLoading, isError, error } = useGetNotes();

  if (isLoading || isError) {
    return (
      <div className="flex items-center justify-center w-full h-full sm:flex-grow">
        <PuffLoader color="#36d7b7" />

        {isError && (
          <p className="text-lg font-bold text-red-600 tet">
            {(error as Error).message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full sm:flex-grow">
      <div className="grid w-full grid-cols-1 gap-3 xl:grid-cols-2 2xl:grid-cols-3">
        {notesId.map((note: NoteProps) => (
          <Note key={note._id} note={note} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default Notes;

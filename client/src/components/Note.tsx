import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

import { NoteProps } from "../types";
import { Textarea } from "./ui/textarea";
import useUpdateNote from "../hooks/notes/useUpdateNote";
import useDeleteNote from "../hooks/notes/useDeleteNote";

const Note = ({ note, refetch }: { note: NoteProps; refetch: () => void }) => {
  const navigate = useNavigate();

  const [isClick, setIsClick] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const {
    mutate: updateMutate,
    isSuccess: updateIdSuccess,
    isLoading: updateIdLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateNote();

  const {
    mutate: deleteMutate,
    isSuccess: deleteIsSuccess,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteNote();

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleUpdateNote = (e: React.MouseEvent) => {
    e.stopPropagation();

    const data = {
      title,
      text,
      noteId: note._id,
    };

    updateMutate(data);
  };

  const handleDeleteNote = (e: React.MouseEvent) => {
    e.stopPropagation();

    const noteId = note._id;

    deleteMutate(noteId);
  };

  useEffect(() => {
    if (updateIdSuccess) {
      toast.success("Note update successful!");
      refetch();

      setIsClick(false);
    }

    if (updateIsError) {
      toast.error((updateError as Error).message);
      navigate(0);
    }
  }, [updateIdSuccess, updateIsError]);

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.success("Note delete successful!");
      refetch();

      setIsClick(false);
    }

    if (deleteIsError) {
      toast.error((deleteError as Error).message);
      navigate(0);
    }
  }, [deleteIsSuccess, deleteIsError]);

  return (
    <Card
      onClick={handleClick}
      className="lg:max-w-sm min-w-full relative h-60 overflow-hidden cursor-pointer lg:min-w-[18rem] bg-[#E3E3E3]/20 text-[#161113]"
    >
      <CardHeader>
        <CardTitle className="text-lg tet">
          {isClick ? (
            <Input
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={title}
              onChange={handleTitleChange}
            />
          ) : (
            <span>{note.title}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-justify tet">
        {isClick ? (
          <Textarea
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="resize-none"
            value={text}
            onChange={handleTextChange}
          />
        ) : (
          <p>
            {note.text.substring(0, 130)} {note.text.length > 130 && " ..."}
          </p>
        )}
      </CardContent>

      <CardFooter className="absolute left-0 flex items-center justify-between w-full -bottom-3">
        <span className="text-xs text-slate-600 tet">
          {formatDistanceToNow(new Date(note.createdAt), {
            addSuffix: true,
          })}
        </span>

        {isClick && (
          <div className="flex items-center space-x-1">
            <Button
              onClick={handleDeleteNote}
              disabled={deleteIsLoading}
              variant={"outline"}
            >
              {deleteIsLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              <p> {deleteIsLoading ? "Deleting" : "Delete"}</p>
            </Button>

            <Button onClick={handleUpdateNote} disabled={updateIdLoading}>
              {updateIdLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              <p> {updateIdLoading ? "Saving" : "Save"}</p>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Note;

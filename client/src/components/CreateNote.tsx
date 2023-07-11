import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import useCreateNote from "../hooks/notes/useCreateNote";
import useGetNotes from "../hooks/notes/useGetNotes";

const noteSchema = yup.object({
  title: yup.string().required(),
  text: yup.string().required(),
});

const CreateNote = () => {
  const navigate = useNavigate();

  const { refetch } = useGetNotes();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    resolver: yupResolver(noteSchema),
  });

  const { mutate, isError, error, isSuccess, isLoading } = useCreateNote();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Note created successful!");
      refetch();
    }

    if (isError) {
      toast.error((error as Error).message);
      navigate(0);
    }
  }, [isSuccess, isError]);

  return (
    <form
      className="lg:max-w-sm sm:max-w-xs w-full p-4 space-y-4 rounded-md shadow lg:min-w-[20rem] sm:min-w-[16rem] tet"
      onSubmit={onSubmit}
    >
      <h4 className="text-lg font-semibold text-slate-700">Create Note</h4>

      <div>
        <label
          className="block mb-2 text-sm font-semibold cursor-pointer w-fit text-slate-700"
          htmlFor="title"
        >
          Title
        </label>
        <Input
          id="title"
          type="text"
          placeholder="title"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm font-semibold text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          className="block mb-2 text-sm font-semibold cursor-pointer w-fit text-slate-700"
          htmlFor="text"
        >
          Text
        </label>
        <Textarea id="text" placeholder="title" {...register("text")} />
        {errors.text && (
          <p className="mt-1 text-sm font-semibold text-red-600">
            {errors.text.message}
          </p>
        )}
      </div>

      <Button
        disabled={isLoading}
        className="flex items-center w-full mt-10 font-semibold"
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        <span>{isLoading ? "Saving" : "Save"}</span>
      </Button>
    </form>
  );
};

export default CreateNote;

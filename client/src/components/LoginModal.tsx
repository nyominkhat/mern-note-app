import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import useUserLogin from "../hooks/auths/useUserLogin";
import useLoginModal from "../lib/modals/useLoginModal";
import useSignupModal from "../lib/modals/useSignupModal";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginModal = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { isOpen: loginIsOpen, onClose: loginClose } = useLoginModal();
  const { onOpen: signupOpen } = useSignupModal();

  const { mutate, isSuccess, isError, isLoading, error, data } = useUserLogin();

  const handleClick = () => {
    loginClose();
    signupOpen();
  };

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Welcome to the Notas!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      loginClose();

      navigate(`/user/${data?.username.toLowerCase().replace(" ", "-")}`);
    }

    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={loginIsOpen} onOpenChange={loginClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* username */}
          <div>
            <label
              className="block mb-2 text-sm font-semibold cursor-pointer w-fit text-slate-700"
              htmlFor="username"
            >
              Name
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Your name ..."
              {...register("username")}
            />

            {errors.username && (
              <p className="mt-1 text-sm font-semibold text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* password */}
          <div>
            <label
              className="block mb-2 text-sm font-semibold cursor-pointer w-fit text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm font-semibold text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            disabled={isLoading}
            className="flex items-center w-full mt-10 font-semibold"
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <span>{isLoading ? "Logging account" : "Login"}</span>
          </Button>
        </form>

        <span
          onClick={handleClick}
          className="text-sm font-semibold underline transition cursor-pointer text-slate-600 w-fit hover:text-slate-400"
        >
          Don't have any account!
        </span>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;

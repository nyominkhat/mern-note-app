import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

import useUserSignup from "../hooks/auths/useUserSignup";
import useSignupModal from "../lib/modals/useSignupModal";

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str}!`;
};

const signupSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: yup
    .string()
    .required("Please re-type your password")
    .oneOf([yup.ref("password")], "Password does not match!"),
});

const SignupModal = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const { mutate, isSuccess, isError, error, isLoading, data } =
    useUserSignup();

  const { isOpen, onClose } = useSignupModal();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Welcome to the Notas!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      onClose();

      navigate(`/user/${data?.username.toLowerCase().replace(" ", "-")}`);
    }

    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign up</DialogTitle>
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

          {/* email */}
          <div>
            <label
              className="block mb-2 text-sm font-semibold cursor-pointer w-fit text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Your email ..."
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm font-semibold text-red-600">
                {errors.email.message}
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

          {/* confirm password */}
          <div>
            <label
              className="block mb-2 text-sm font-semibold cursor-pointer w-fit text-slate-700"
              htmlFor="confirmPas"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPas"
              type="password"
              placeholder="Confirm your password ..."
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm font-semibold text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            disabled={isLoading}
            className="flex items-center w-full mt-10 font-semibold"
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <span>{isLoading ? "Signing up" : "Sign up"}</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;

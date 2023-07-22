import { useNavigate } from "react-router-dom";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { Button } from "./ui/button";
import UserDropdown from "./UserDropdown";

import authorized from "../helpers/auth";
import getUser from "../helpers/getUser";
import useLoginModal from "../lib/modals/useLoginModal";
import useSignupModal from "../lib/modals/useSignupModal";

import logo from "../../public/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const isAuthorized = authorized();

  const name = getUser();

  const { onOpen: loginOpen } = useLoginModal();
  const { onOpen: signupOpen } = useSignupModal();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="container flex items-center justify-between w-full h-full mx-auto">
      <figure
        onClick={handleClick}
        className="w-24 h-10 transition rounded-sm shadow cursor-pointer sm:h-14 sm:w-36 hover:shadow-lg"
      >
        <img className="object-cover w-full h-full" src={logo} alt="" />
      </figure>

      {isAuthorized ? (
        <UserDropdown name={name} />
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            onClick={loginOpen}
            className="text-xs font-semibold sm:text-sm"
          >
            Login
          </Button>
          <Button
            onClick={signupOpen}
            variant="outline"
            className="text-xs font-semibold sm:text-sm"
          >
            Sign up
          </Button>
        </div>
      )}

      <LoginModal />
      <SignupModal />
    </div>
  );
};

export default Navbar;

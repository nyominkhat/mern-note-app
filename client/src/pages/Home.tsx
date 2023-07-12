import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

import getUser from "../helpers/getUser";
import useSignupModal from "../lib/modals/useSignupModal";

const Home = () => {
  const navigate = useNavigate();
  const { onOpen: signupOpen } = useSignupModal();

  const name = getUser();

  const handleOnClick = () => {
    if (name) {
      navigate(`/user/${name?.toLowerCase().replace(" ", "-")}`);

      return;
    }

    signupOpen();
  };

  return (
    <div className="container flex flex-col items-center justify-center w-full h-full gap-10 mx-auto">
      <h1 className="text-2xl font-bold text-center lg:text-6xl md:text-4xl">
        The simplest way to keep <br /> notes
      </h1>

      <Button className="font-bold" onClick={handleOnClick}>
        Sign up now
      </Button>
    </div>
  );
};

export default Home;

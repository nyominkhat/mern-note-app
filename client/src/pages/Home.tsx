import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

import getUser from "../helpers/getUser";
import useSignupModal from "../lib/modals/useSignupModal";

const Home = () => {
  const navigate = useNavigate();
  const { onOpen: signupOpen } = useSignupModal();

  const name = getUser();

  useEffect(() => {
    document.title = "Notas || The best way to keep notes";
  }, []);

  const handleOnClick = () => {
    if (name) {
      navigate(`/user/${name?.toLowerCase().replace(/\s/g, "-")}`);

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
        Let's notes
      </Button>
    </div>
  );
};

export default Home;

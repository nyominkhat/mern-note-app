import { Button } from "../components/ui/button";
import useSignupModal from "../lib/modals/useSignupModal";

const Home = () => {
  const { onOpen: signupOpen } = useSignupModal();

  return (
    <div className="container flex flex-col items-center justify-center w-full h-full gap-10 mx-auto">
      <h1 className="text-2xl font-bold text-center lg:text-6xl md:text-4xl">
        The simplest way to keep <br /> notes
      </h1>

      <Button className="font-bold" onClick={signupOpen}>
        Sign up now
      </Button>
    </div>
  );
};

export default Home;

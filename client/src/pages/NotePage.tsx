import { useEffect } from "react";

import CreateNote from "../components/CreateNote";
import Notes from "../components/Notes";
import getUser from "../helpers/getUser";

const NotePage = () => {
  const name = getUser();

  useEffect(() => {
    document.title = `Notas || ${name}`;
  }, [name]);

  return (
    <div className="container flex flex-col-reverse items-start justify-between w-full h-full gap-4 mx-auto overflow-hidden overflow-y-scroll sm:flex-row">
      <Notes />

      <CreateNote />
    </div>
  );
};

export default NotePage;

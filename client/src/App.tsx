import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";

import Layout from "./layouts/Layout";

import NotePage from "./pages/NotePage";
import Home from "./pages/Home";

import getToken from "./helpers/getToken";

import useLoginModal from "./lib/modals/useLoginModal";

function App() {
  const token = getToken();

  const navigate = useNavigate();

  const { onOpen: loginOpen } = useLoginModal();

  useEffect(() => {
    if (token) {
      const decode = jwtDecode<JwtPayload>(token as string);

      if (decode.exp && decode.exp * 1000 <= Date.now()) {
        console.log("time to logout");

        localStorage.clear();

        navigate("/");
        loginOpen();
      }
    }
  }, [token]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/user/:slug`} element={token && <NotePage />} />
      </Routes>
    </Layout>
  );
}

export default App;

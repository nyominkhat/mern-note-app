import React from "react";

import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex flex-col w-screen h-screen overflow-hidden">
      <nav className="flex-shrink-0 w-full shadow h-28">
        <Navbar />
      </nav>

      <section className="flex-grow my-5 overflow-y-scroll">{children}</section>
    </main>
  );
};

export default Layout;

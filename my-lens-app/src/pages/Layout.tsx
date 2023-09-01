import React from "react";
import Navbar from "../Components/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className=" w-full  items-center fixed flex justify-center top-0  z-10 ">
      <Navbar />
    </div>
  );
};

export default Layout;

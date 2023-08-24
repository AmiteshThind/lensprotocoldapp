import React from "react";
import SignInButton from "./SignInButton";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="w-full ">
      <div className="navbar px-5 bg-base-100">
        <div className="navbar-start">
          <a className="normal-case text-xl ">WisDAO</a>
        </div>
        <div className="navbar-middle">
          <a className="normal-case text-4xl font-bold text-white  ">Feed</a>
        </div>
        <div className="navbar-end">
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

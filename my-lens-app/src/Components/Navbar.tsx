import React from "react";
import SignInButton from "./SignInButton";
import { MediaRenderer } from "@thirdweb-dev/react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar z-10 bg-base-100 !shadow-2xl w-full ">
      <div className="navbar-start">
        <div className="dropdown ">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="avatar">
            <div className="w-12 mx-5">
              <MediaRenderer
                width="100%"
                height="100%"
                src={"../../images/wisdaoIcon.png"}
              />
            </div>
          </div>
          <div className="text-center text-sm font-bold text-emerald-400">
            WisDAO
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          <li>
            <a>Feed</a>
          </li>
          <li>
            <a>My Wizz</a>
          </li>
          <li>
            <a>Profile</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <SignInButton />
      </div>
    </div>
  );
};

export default Navbar;

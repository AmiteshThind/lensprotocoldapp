import React from "react";
import SignInButton from "./SignInButton";
import { MediaRenderer } from "@thirdweb-dev/react";
import { AiOutlineFileAdd } from "react-icons/ai";
import {
  HiOutlineBriefcase,
  HiOutlineHome,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useLensUser from "../lib/auth/useLensUser";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();
  const { profileQuery } = useLensUser();
  console.log(pathname + "wp");
  return (
    <div className=" w-full  items-center fixed flex justify-center top-0  z-10">
      <div className="navbar backdrop-blur bg-neutral-900/75 z-10   border-b border-neutral-800  w-full ">
        <div className="navbar-start ">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2   bg-emerald-400  text-white font-semibold rounded-box w-52"
            >
              <li>
                <a className="hover:text-neutral-800">Feed</a>
              </li>
              <li>
                <a className="hover:text-neutral-800">My Wizz</a>
              </li>
              <li>
                <a className="hover:text-neutral-800">Create Wizz</a>
              </li>
              <li>
                <a className="hover:text-neutral-800">Coming soon</a>
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
            <div className="text-center text-sm  font-semibold text-emerald-300 border-text">
              WizDAO
            </div>
          </div>
        </div>
        <div className="navbar-center hidden    lg:flex">
          <ul className="menu menu-horizontal text-md ">
            <li>
              <Link
                href={"/"}
                className={
                  pathname === "/"
                    ? "text-emerald-400 py-2 px-10 hover:text-emerald-300 hover:tool hover:tooltip tooltip-primary hover:tooltip-open hover:tooltip-bottom"
                    : "" +
                      "py-2 px-10 hover:tooltip tooltip-primary hover:tooltip-open hover:tooltip-bottom"
                }
                data-tip="Home"
              >
                <HiOutlineHome className="w-8 h-8" />
              </Link>
            </li>
            <li>
              <Link
                href={"/myprofile"}
                className={
                  pathname === "/myprofile"
                    ? "text-emerald-400 py-2 px-10 hover:text-emerald-300 hover:tool hover:tooltip tooltip-primary hover:tooltip-open hover:tooltip-bottom"
                    : "" +
                      "py-2 px-10 hover:tooltip tooltip-primary hover:tooltip-open hover:tooltip-bottom"
                }
                data-tip="My Wizz"
              >
                <HiOutlineBriefcase className="w-8 h-8" />
              </Link>
            </li>
            <li>
              <Link
                href={"/createwizz"}
                className={
                  pathname === "/createwizz"
                    ? "text-emerald-400 py-2 px-10 hover:text-emerald-300 hover:tool hover:tooltip tooltip-primary hover:tooltip-open hover:tooltip-bottom"
                    : "" +
                      "py-2 px-10 hover:tooltip tooltip-primary hover:tooltip-open hover:tooltip-bottom"
                }
                data-tip="Create Wizz"
              >
                <AiOutlineFileAdd className="w-8 h-8" />
              </Link>
            </li>
            <li>
              <a
                className=" py-2 px-10 hover:tooltip tooltip-primary hover:tooltip-open hover:tooltip-bottom"
                data-tip="Coming Soon"
              >
                <HiOutlineChatAlt2 className="w-8 h-8" />
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex w-full md:w-1/2  ">
          <div
            className={
              !!profileQuery.data
                ? " bg-emerald-300 flex items-center rounded-full p-1"
                : "flex items-center"
            }
          >
            <div className="  avatar ">
              <div className="w-12 h-12 mx-2 rounded-full ">
                <MediaRenderer
                  width="100%"
                  height="100%"
                  src={
                    // @ts-ignore - the type does exist
                    profileQuery.data?.defaultProfile?.picture?.original?.url ||
                    "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
                  }
                />
              </div>
            </div>
            <div>
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

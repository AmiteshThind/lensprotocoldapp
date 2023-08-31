import { MediaRenderer } from "@thirdweb-dev/react";
import React from "react";

type Props = {};

const Menu = (props: Props) => {
  return (
    <div className=" flex m-5  items-center     flex-col   ">
      <ul className="menu       bg-zinc-800 w-56 items-center  rounded-box">
        <li className="my-5">
          <div className="avatar">
            <div className="w-24">
              <MediaRenderer
                width="100%"
                height="100%"
                src={"../../images/wisdaoIcon.png"}
              />
            </div>
          </div>
          <div className="text-center ">
            <div className="font-bold text-xl text-emerald-400">
              WisDAO
              <div />
              <div className="text-sm my-0 font-semibold text-black">
                Share your story
              </div>
            </div>
          </div>
        </li>
        <li className="my-5">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Feed
          </a>
        </li>
        <li className="my-5 text-xl">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Wizz
          </a>
        </li>
        <li className="my-5">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Profile
          </a>
        </li>
        <div>
          <button className="mt-20 mb-10 btn btn-outline btn-success">
            New Post
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Menu;

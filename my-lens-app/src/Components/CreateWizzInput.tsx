import React from "react";
import useLensUser from "../lib/auth/useLensUser";
import { MediaRenderer } from "@thirdweb-dev/react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import CreateWizzForm from "./CreateWizzForm";

type Props = {};

function CreateWizzInput({}: Props) {
  const { profileQuery } = useLensUser();
  return (
    <div className="w-1/3">
      <div className="flex w-full p-5 border-neutral-700  rounded-xl   border   mt-6 mb-4">
        <div className="avatar ">
          <div className=" h-12 w-12 mx-2">
            <MediaRenderer
              width="100%"
              height="100%"
              className="rounded-full"
              src={
                // @ts-ignore - the type does exist
                profileQuery.data?.defaultProfile?.picture?.original?.url ||
                "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
              }
            />
          </div>
        </div>
        <div
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className=" w-full h-full cursor-pointer "
        >
          <div
            placeholder="Share some wizz!"
            className="input input-bordered w-full flex items-center "
          >
            <div>
              <HiOutlinePencilAlt classname="w-10 h-10" />
            </div>
            <div className="text-neutral-500 mx-2">Share some wizz!</div>
          </div>
        </div>

        <CreateWizzForm />
      </div>
    </div>
  );
}

export default CreateWizzInput;

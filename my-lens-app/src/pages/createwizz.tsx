import React, { useEffect, useState } from "react";
import { WizzPost } from "../common/types";
import CreatePostForm from "../Components/CreateWizzForm";

type Props = {};
const createwizz = (props: Props) => {
  return (
    <div className=" flex justify-center mt-36  w-full   ">
      <div className="w-4/5 md:w-3/6">
        <CreatePostForm />
      </div>
    </div>
  );
};

export default createwizz;

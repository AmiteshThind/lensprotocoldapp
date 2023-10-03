import React, { useEffect, useState } from "react";
import { WizzPost } from "../common/types";
import CreatePostForm from "../Components/CreatePostForm";

type Props = {};
const createwizz = (props: Props) => {
  return (
    <div className=" flex mt-36  items-center flex-col  w-full   ">
      <CreatePostForm />
    </div>
  );
};

export default createwizz;

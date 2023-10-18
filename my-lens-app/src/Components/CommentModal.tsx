import React, { useEffect, useState } from "react";
import {
  WizzComment,
  WizzCommentError,
  WizzPost,
  WizzPostFormError,
} from "../common/types";
import { BiErrorCircle } from "react-icons/bi";
import { MediaRenderer, Web3Button } from "@thirdweb-dev/react";
import { LENS_CONTRACT_ADDRESS, LENS_CONTRACT_ABI } from "../const/contracts";
import { useCreatePost } from "../lib/auth/usePost";
import { ExplorePublicationsQuery } from "../graphql/generated";
interface Props {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
}

const CommentModal = ({ publication }: Props) => {
  const { mutateAsync: createPost } = useCreatePost();
  const [newWizzComment, setNewWizzComment] = useState<WizzComment>({
    text: "",
  });

  const [errorMessages, setErrorMessages] = useState<WizzCommentError>({
    textError: "",
  });

  function createNewWizzComment(e: any): void {
    e.preventDefault();

    if (newWizzComment.text == "") {
      setErrorMessages({
        ...errorMessages,
        textError: "Comment must contain text",
      });
      return;
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={createNewWizzComment}
        className="w-full border border-neutral-800 rounded-xl  "
      >
        <div>
          {errorMessages.textError ? (
            <span className="text-red-500 mx-3 my-2 flex">
              <BiErrorCircle className="h-6 w-4" />
              <span className="ml-1">{errorMessages.textError}</span>
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full">
          <div className="w-full flex my-5 ">
            <div className="avatar h-14  ">
              <div className=" mx-3 rounded-full">
                <MediaRenderer
                  width="100%"
                  height="100%"
                  src={
                    // @ts-ignore - the type does exist
                    publication?.profile?.picture?.original?.url ||
                    "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
                  }
                />
              </div>
            </div>
            <p className=" textarea w-full mx-3">
              {publication?.metadata?.description}
            </p>
          </div>
          <div className="flex">
            <div className="avatar  h-14 ">
              <div className=" mx-3 rounded-full">
                <MediaRenderer
                  width="100%"
                  height="100%"
                  src={
                    // @ts-ignore - the type does exist
                    publication?.profile?.picture?.original?.url ||
                    "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
                  }
                />
              </div>
            </div>
            <div className="mx-3 w-full">
              <textarea
                onChange={(e) => {
                  setNewWizzComment({
                    ...newWizzComment,
                    text: e.target.value,
                  });
                }}
                className="textarea textarea-bordered border-2 h-24 w-full text-white"
                placeholder="Post Reply"
              ></textarea>
            </div>
          </div>
          <div className="w-full my-5 flex justify-center">
            <Web3Button
              contractAddress={LENS_CONTRACT_ADDRESS}
              contractAbi={LENS_CONTRACT_ABI}
              // action={async () => {
              //   await (newWizz).then(() => {
              //     setNewWizzComment({
              //     text:""
              //     });
              //   });
              // }}
              className="btn-success rounded-3xl mt-5 btn btn-wide"
            >
              Reply
            </Web3Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentModal;

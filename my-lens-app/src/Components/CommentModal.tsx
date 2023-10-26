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
import { useCreateComment } from "../lib/auth/useCreateComment";
import { IoMdSend } from "react-icons/io";
interface Props {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
}

const CommentModal = ({ publication }: Props) => {
  const { mutateAsync: creatComment } = useCreateComment();
  const [newWizzComment, setNewWizzComment] = useState<WizzComment>({
    text: "",
    publicationId: publication.id,
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
    <dialog id={"my_modal_4" + publication.id} className="modal">
      <div className="modal-box p-8">
        <div className="w-full">
          <form
            onSubmit={createNewWizzComment}
            className="w-full border border-neutral-800 rounded-xl  "
          >
            <form method="dialog">
              <button
                onClick={(e) => {
                  setNewWizzComment({ ...newWizzComment, text: "" });
                  setErrorMessages({
                    ...errorMessages,
                    textError: "",
                  });
                }}
                className="btn btn-xs mx-1 my-1 btn-circle btn-ghost absolute right-1 top-1"
              >
                ✕
              </button>
            </form>
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

            <div className="w-full ">
              <div className="w-full flex my-5   border-neutral-600  ">
                <div className="avatar h-14    ">
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
                <p className="  textarea w-full mx-3">
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
                <div className="mx-3 w-full     border-2 rounded-xl border-neutral-800 bg-neutral-900">
                  <div
                    contentEditable
                    onInput={(e) => {
                      const input = e.target as HTMLElement;
                      setNewWizzComment({
                        ...newWizzComment,
                        text: input.innerText,
                      });
                    }}
                    className="  outline-none p-3 text-sm  min-h-16 w-full text-white"
                    data-text="Post Reply"
                  ></div>
                  <div className=" flex justify-end p-2 ">
                    <IoMdSend className="hover:text-emerald-400 cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="w-full my-5 flex justify-center">
                <Web3Button
                  contractAddress={LENS_CONTRACT_ADDRESS}
                  contractAbi={LENS_CONTRACT_ABI}
                  action={async () => {
                    console.log("called reply");
                    if (newWizzComment.text != "") {
                      await creatComment(newWizzComment).then(() => {
                        setNewWizzComment({ ...newWizzComment, text: "" });

                        document
                          .getElementById("my_modal_4" + publication.id)
                          .close();
                      });
                    } else {
                      setErrorMessages({
                        ...errorMessages,
                        textError: "Comment must contain text",
                      });
                    }
                  }}
                  className="btn-success rounded-3xl mt-5 btn btn-wide"
                >
                  Reply
                </Web3Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CommentModal;

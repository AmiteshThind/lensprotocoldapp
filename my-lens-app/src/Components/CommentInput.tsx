import { MediaRenderer, Web3Button } from "@thirdweb-dev/react";
import React, { useState } from "react";
import useLensUser from "../lib/auth/useLensUser";
import { useCreateComment } from "../lib/auth/useCreateComment";
import { WizzComment } from "../common/types";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import { darkTheme, lightTheme } from "@thirdweb-dev/react";

type Props = {
  publicationId: string;
};

const CommentInput = ({ publicationId }: Props) => {
  const { profileQuery } = useLensUser();
  const { mutateAsync: creatComment } = useCreateComment();
  const [newWizzComment, setNewWizzComment] = useState<WizzComment>({
    text: "",
    publicationId: publicationId,
  });
  const commentInputText = document.getElementById("commentText");

  return (
    <div>
      <div className="flex px-10   relative ">
        <div className="   transition delay-150 border rounded-xl my-2 border-neutral-700   w-full     ">
          <div className="text-neutral-100 flex">
            <div className="flex   mx-5 my-3   items-center w-full">
              <div className="avatar  h-full flex items-start  w-24">
                <div className=" mx-3 rounded-full">
                  <MediaRenderer
                    width="100%"
                    height="100%"
                    src={
                      // @ts-ignore - the type does exist
                      profileQuery.data?.defaultProfile?.picture?.original
                        ?.url ||
                      "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
                    }
                  />
                </div>
              </div>

              <div className=" mx-5 inline-block  text-sm w-full">
                <div
                  id="commentText"
                  contentEditable
                  data-text="Post reply here..."
                  onInput={(e) => {
                    const input = e.target as HTMLElement;
                    setNewWizzComment({
                      ...newWizzComment,
                      text: input.innerText,
                    });
                  }}
                  className={
                    " scrollbar bg-transparent text-sm my-2  cursor-pointer   outline-none flex   "
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full  flex justify-end p-2 ">
            <Web3Button
              contractAddress={LENS_CONTRACT_ADDRESS}
              contractAbi={LENS_CONTRACT_ABI}
              action={async () => {
                console.log("called reply on post page");
                await creatComment(newWizzComment).then(() => {
                  setNewWizzComment({ ...newWizzComment, text: "" });
                  if (commentInputText) commentInputText.innerText = "";
                });
              }}
              className="btn-success  !rounded-full !text-sm    hover:text-white"
            >
              Reply
            </Web3Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;

import { MediaRenderer } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { PublicationsQuery, usePublicationsQuery } from "../graphql/generated";
import LikePost from "./LikePost";
import { IoMdSend } from "react-icons/io";
import { useCreateComment } from "../lib/auth/useCreateComment";
import { WizzComment } from "../common/types";
type Props = {
  comment: PublicationsQuery["publications"]["items"][0];
};

const Comment = ({ comment }: Props) => {
  //we have the publication which is comment
  //1. make query for publications based on this comment

  const { isLoading, error, data } = usePublicationsQuery(
    // collectedBy?: InputMaybe<Scalars['EthereumAddress']['input']>;
    // commentsOf?: InputMaybe<Scalars['InternalPublicationId']['input']>;
    // commentsOfOrdering?: InputMaybe<CommentOrderingTypes>;
    // commentsRankingFilter?: InputMaybe<CommentRankingFilter>;
    // cursor?: InputMaybe<Scalars['Cursor']['input']>;
    // customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
    // limit?: InputMaybe<Scalars['LimitScalar']['input']>;
    // metadata?: InputMaybe<PublicationMetadataFilters>;
    // profileId?: InputMaybe<Scalars['ProfileId']['input']>;
    // profileIds?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
    // publicationIds?: InputMaybe<Array<Scalars['InternalPublicationId']['input']>>;
    // publicationTypes?: InputMaybe<Array<PublicationTypes>>;
    // sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
    {
      request: {
        commentsOf: comment.id,
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (data) {
    console.log(data.publications?.items[0]?.metadata);
  }

  const [showReplySection, setShowReplySection] = useState<boolean>(false);
  const { mutateAsync: creatComment } = useCreateComment();
  const commentInputText = document.getElementById("commentTextArea");
  const [newWizzComment, setNewWizzComment] = useState<WizzComment>({
    text: "",
    publicationId: comment.id,
  });
  //2. everytime a comment is made under another comment it should also store its reference to the main pubication it comes udner
  async function createComment() {
    await creatComment(newWizzComment).then(() => {
      setNewWizzComment({ ...newWizzComment, text: "" });
      if (commentInputText) commentInputText.innerText = "";
    });
  }

  return (
    <div>
      <div className="flex   relative ">
        <div className="   transition delay-150 border rounded-xl my-2 border-neutral-700 bg-neutral-800     w-full     ">
          <div className="text-neutral-100">
            <div className="flex mx-5 my-3">
              <div className="avatar ">
                <div className="w-8 mx-3 rounded-full">
                  <MediaRenderer
                    width="100%"
                    height="100%"
                    src={
                      // @ts-ignore - the type does exist
                      comment?.profile?.picture?.original?.url ||
                      "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
                    }
                  />
                </div>
              </div>

              <div className="  flex items-center text-md w-full">
                <div>
                  <span className="mr-2 text-sm font-bold">
                    {comment?.profile?.name}
                  </span>
                  <span className="text-xs  text-neutral-400">
                    @{comment?.profile.handle}
                  </span>
                </div>
              </div>
            </div>

            <div className="cursor-pointer">
              <div className="flex mx-10 mb-3 ">
                <div className="text-ellipsis text-neutral-100 overflow-hidden line-clamp-5 text-sm   ">
                  {comment.metadata.description}
                </div>
              </div>
            </div>
            <div className="mx-10 mb-3 flex ">
              <div className="mr-5">
                <LikePost post={comment}></LikePost>
              </div>
              <div
                onClick={() => setShowReplySection(!showReplySection)}
                className="text-sm  cursor-pointer text-neutral-300 hover:underline"
              >
                Reply
              </div>
            </div>
            {showReplySection && (
              <div className="w-full  flex px-10  pb-2">
                <div className=" min-h-16 outline-none border-none p-5 rounded-xl bg-neutral-900 w-full border">
                  <div
                    id="commentTextArea"
                    className="outline-none border-none text-sm "
                    contentEditable="true"
                    data-text="Post comment here..."
                  ></div>
                  <div
                    onClick={() => createComment()}
                    className=" flex justify-end "
                  >
                    <IoMdSend className="hover:text-emerald-400 cursor-pointer" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;

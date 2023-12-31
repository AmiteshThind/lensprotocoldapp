import React, { useState } from "react";
import {
  ExplorePublicationsQuery,
  PublicationsQuery,
} from "../graphql/generated";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Player } from "@livepeer/react";
import Link from "next/link";
import LikePost from "./LikePost";
import CollectPost from "./CollectPost";
import CommentPost from "./CommentPost";
import CommentModal from "./CommentModal";
import { useRouter } from "next/router";

type Props = {
  publication:
    | ExplorePublicationsQuery["explorePublications"]["items"][0]
    | PublicationsQuery["publications"]["items"][0];
};

const FeedPost = ({ publication }: Props) => {
  const router = useRouter();
  const urlPath = router.route;
  console.log(urlPath.includes("post"));

  const [showCommentModal, setShowCommentModal] = useState<boolean>(true);

  return (
    <div className="flex   relative ">
      <div
        className={
          urlPath.includes("post")
            ? "transition delay-150 border  border-neutral-700     w-full  rounded-t-xl"
            : "transition delay-150 border  border-neutral-700     w-full  rounded-xl"
        }
      >
        <div className="text-neutral-100">
          <div className="flex mx-5 my-5">
            <Link href={`/profile/${publication.profile.handle}`}>
              <div className="avatar ">
                <div className="w-12 mx-3 rounded-full">
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
            </Link>
            <div className="  flex items-center text-md w-full">
              <div>
                <span className="mr-2 text-lg font-bold">
                  {publication?.profile?.name}
                </span>
                <span className="text-sm  text-neutral-400">
                  @{publication?.profile.handle}
                </span>
              </div>
              <div className="w-full flex justify-end mx-5">
                <div className=" text-xs uppercase p-3 badge bg-emerald-500 text-neutral-100  ">
                  {publication.metadata.tags[0]}
                </div>
              </div>
            </div>
          </div>
          <Link href={`/post/${publication?.id}`}>
            <div className="cursor-pointer">
              <div className="flex mx-10 ">
                <div className="text-ellipsis text-neutral-100 overflow-hidden line-clamp-5 text-sm   ">
                  {publication.metadata.description}
                </div>
              </div>
              {publication.metadata.image && (
                <div className="my-5 px-10 flex ">
                  {publication?.metadata?.image.includes("MOV") ? (
                    <Player
                      src={publication?.metadata?.image}
                      showPipButton
                      showTitle={true}
                      aspectRatio="16to9"
                      controls={{
                        autohide: 3000,
                      }}
                    />
                  ) : (
                    <MediaRenderer
                      width="75%"
                      height="100%"
                      src={
                        publication.metadata.image ||
                        publication.metadata.media[0].original.url
                      }
                    />
                  )}
                </div>
              )}
            </div>
          </Link>
        </div>
        <div className="flex my-5 justify-evenly">
          <LikePost post={publication} />
          <CollectPost publication={publication} />
          <CommentPost
            showCommentModal={showCommentModal}
            publication={publication}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedPost;

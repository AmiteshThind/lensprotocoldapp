import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Player } from "@livepeer/react";
import Link from "next/link";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

const FeedPost = ({ publication }: Props) => {
  console.log(publication.metadata.image);
  return (
    <div className="flex   relative  ">
      <div className=" rounded-2xl my-2 transition delay-150 border-t border-r border-l border-neutral-700     w-full   bg-neutral-800 ">
        <div className="text-neutral-100">
          <Link href={`/profile/${publication.profile.handle}`}>
            <div className="flex mx-5 my-5">
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

              <h2 className="card-title">
                {publication?.profile?.name || publication?.profile.handle}
              </h2>
            </div>
          </Link>
          {(publication?.metadata?.media?.length > 0 ||
            publication.metadata.image) && (
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
          <div className="flex mx-5 my-5">
            <div className="text-ellipsis text-neutral-100 overflow-hidden line-clamp-5  ">
              {publication.metadata.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;

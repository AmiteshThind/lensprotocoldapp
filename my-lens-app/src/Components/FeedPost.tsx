import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Player } from "@livepeer/react";
import Link from "next/link";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

const FeedPost = ({ publication }: Props) => {
  return (
    <div className="flex  mb-5  relative top-10  ">
      <div className=" transition delay-150  card  w-full  rounded-3xl  bg-neutral-800 ">
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
          {publication?.metadata?.media?.length > 0 && (
            <div className="my-5 flex ">
              {publication.metadata.media[0].original.url.includes("m3u8") ? (
                <Player
                  src={publication?.metadata?.media[0]?.original?.url}
                  showPipButton
                  showTitle={true}
                  aspectRatio="16to9"
                  controls={{
                    autohide: 3000,
                  }}
                />
              ) : (
                <MediaRenderer
                  width="100%"
                  height="100%"
                  src={publication.metadata.media[0].original.url}
                />
              )}
            </div>
          )}
          <div className="flex mx-5 my-5">
            <div className="text-ellipsis text-neutral-100 overflow-hidden line-clamp-5  ">
              {publication.metadata.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;

import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Player } from "@livepeer/react";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

const FeedPost = ({ publication }: Props) => {
  return (
    <div className="flex w-full shadow-2xl shadow-teal-600">
      <div className="card w-full rounded-none bg-base-100 border-b border-slate-600 ">
        <div className="card-body">
          <div className="flex">
            <div className="avatar">
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
          {publication?.metadata?.media?.length > 0 && (
            <div className=" my-5 flex justify-center">
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
                  width="500px"
                  height="500px"
                  src={publication.metadata.media[0].original.url}
                />
              )}
            </div>
          )}
          <div>
            <div className="text-ellipsis overflow-hidden">
              {publication.metadata.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;

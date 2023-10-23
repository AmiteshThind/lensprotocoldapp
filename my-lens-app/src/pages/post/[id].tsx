import CommentsList from "@/src/Components/CommentsList";
import FeedPost from "@/src/Components/FeedPost";
import { usePublicationsQuery } from "@/src/graphql/generated";
import { useFollow } from "@/src/lib/auth/useFollow";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const PostPage = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

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
        //publicationIds: [id],
        sources: ["wizz_dao"],
        commentsOf: id,
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const {
    isLoading: isLoadingPublication,
    error: errorPublication,
    data: publication,
  } = usePublicationsQuery(
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
        publicationIds: [id],
        sources: ["wizz_dao"],
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  console.log(data);

  if (isLoading || isLoadingPublication) {
    console.log("isLOADING");
    return (
      <div className="h-screen flex w-screen justify-center items-center">
        <span className="  loading loading-spinner loading-lg text-emerald-500 "></span>
      </div>
    );
  }
  //query publication and query the comments for that publication
  // display that info
  // be able to add new comment and render so new comment shows up
  return (
    <div className="mt-24 flex justify-center">
      <div className="w-1/3">
        <FeedPost publication={publication?.publications.items[0]} />
        <CommentsList
          comments={data?.publications.items}
          publicationId={publication?.publications.items[0].id}
        />
      </div>
    </div>
  );
};

export default PostPage;

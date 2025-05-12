import React from "react";

type LoadMoreButtonProps = {
  username: string;
  endCursor: string | null;
  fetchMore: any;
  setRepositories: React.Dispatch<React.SetStateAction<any[]>>;
  setEndCursor: React.Dispatch<React.SetStateAction<string | null>>;
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>;
  hasNextPage: boolean;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  username,
  endCursor,
  fetchMore,
  setRepositories,
  setEndCursor,
  setHasNextPage,
  hasNextPage,
}) => {
  const loadMore = () => {
    fetchMore({
      variables: {
        username,
        first: 10,
        after: endCursor,
      },
    }).then(({ data: fetchMoreResult }: any) => {
      const newRepos = fetchMoreResult.user.repositories.nodes;
      const pageInfo = fetchMoreResult.user.repositories.pageInfo;

      setRepositories((prev) => [...prev, ...newRepos]);
      setEndCursor(pageInfo.endCursor);
      setHasNextPage(pageInfo.hasNextPage);
    });
  };

  if (!hasNextPage) return null;

  return (
    <div className="text-center my-4">
      <button
        onClick={loadMore}
        className="px-4 py-2 bg-blue-600 text-white rounded 
          hover:bg-blue-700"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;

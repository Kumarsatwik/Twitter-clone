import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePosts = (postId?: string) => {
  const url = postId ? `/api/posts/${postId}` : "";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { data, error, isLoading, mutate };
};

export default usePosts;

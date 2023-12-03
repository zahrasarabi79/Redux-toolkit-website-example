import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts, selectPostIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useEffect } from "react";
const PostsLists = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);
  let content;
  if (postsStatus === "loading") {
    content = <p>Loading . . . </p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostIds.map((postId) => <PostsExcerpt key={postId} postId={postId} />);
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <section>{content}</section>;
};

export default PostsLists;

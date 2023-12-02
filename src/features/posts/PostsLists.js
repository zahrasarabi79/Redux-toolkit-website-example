import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useEffect } from "react";
const PostsLists = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
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
    const orderedPosts = posts.slice().sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
    content = orderedPosts.map((post, index) => <PostsExcerpt key={index} post={post} />);
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <section>{content}</section>;
};

export default PostsLists;

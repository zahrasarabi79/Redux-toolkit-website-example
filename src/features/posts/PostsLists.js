import { useSelector } from "react-redux";
import React from "react";
import { selectAllPosts } from "./postsSlice";
const PostsLists = () => {
  const posts = useSelector(selectAllPosts);
  const renderdPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));
  return (
    <section>
      <h2>PostsLists</h2>
      {renderdPosts}
    </section>
  );
};

export default PostsLists;

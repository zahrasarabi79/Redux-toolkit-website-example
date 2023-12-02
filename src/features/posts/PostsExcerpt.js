import React from "react";
import ReactionButton from "./ReactionButton";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsExcerpt = ({ post }) => {
  console.log(post);
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.content?.substring(0, 100)}</p>
      <p className="PostCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

export default PostsExcerpt;

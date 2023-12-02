import React from "react";
import { selectPostById } from "./postsSlice";
import ReactionButton from "./ReactionButton";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return (
      <section>
        <h2>post not found!</h2>
      </section>
    );
  } else {
    return (
      <article>
        <h3>{post.title}</h3>
        <p>{post.content?.substring(0, 100)}</p>
        <p className="PostCredit">
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButton post={post} />
      </article>
    );
  }
};

export default SinglePostPage;

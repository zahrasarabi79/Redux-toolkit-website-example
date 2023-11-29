import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
const PostsLists = () => {
  const posts = useSelector(selectAllPosts);
  const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
  const renderdPosts = orderedPost.map((post) => {
    return (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
        <p className="PostCredit">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
      </article>
    );
  });
  return (
    <section>
      <h2>PostsLists</h2>
      {renderdPosts}
    </section>
  );
};

export default PostsLists;

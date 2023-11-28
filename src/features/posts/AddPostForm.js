import { useState } from "react";
import React from "react";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <label htmlFor="postTitle">PostTitle:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={(e) => onTitleChange(e)} />
        <label htmlFor="postContent">PostContent:</label>
        <input type="text" id="postContent" name="postContent" value={content} onChange={(e) => onContentChange(e)} />
        <button type="button">Save Post</button>
      </form>
    </section>
  );
};

export default AddPostForm;

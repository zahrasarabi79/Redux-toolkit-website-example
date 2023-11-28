import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";
const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content));
      setTitle("");
      setContent("");
    }
  };
  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <label htmlFor="postTitle">PostTitle:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={(e) => onTitleChange(e)} />
        <label htmlFor="postContent">PostContent:</label>
        <input type="text" id="postContent" name="postContent" value={content} onChange={(e) => onContentChange(e)} />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;

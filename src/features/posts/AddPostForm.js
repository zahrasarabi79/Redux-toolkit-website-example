import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { postAdded } from "./postsSlice";
const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUsers);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
      setUserId("");
    }
  };
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  const conSave = Boolean(title) && Boolean(content) && Boolean(userId);
  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <label htmlFor="postTitle">PostTitle:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={(e) => onTitleChange(e)} />

        <label htmlFor="postAthure">Athure:</label>
        <select type="text" id="postAthure" name="postAthure" value={userId} onChange={(e) => onAuthorChange(e)}>
          <option value=""></option>
          {userOptions}
        </select>

        <label htmlFor="postContent">PostContent:</label>
        <input type="text" id="postContent" name="postContent" value={content} onChange={(e) => onContentChange(e)} />

        <button type="button" onClick={onSavePostClicked} disabled={!conSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;

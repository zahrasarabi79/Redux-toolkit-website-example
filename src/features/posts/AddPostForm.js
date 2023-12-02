import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPosts } from "./postsSlice";
import { useNavigate } from "react-router-dom";
const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUsers);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);
  const conSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (conSave) {
      try {
        setAddRequestStatus("pending");
        //unwrap:return action payload or throw errors
        dispatch(addNewPosts({ title, content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.log("faoled to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
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

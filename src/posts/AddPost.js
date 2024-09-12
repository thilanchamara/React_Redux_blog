import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectAllUsers } from "../users/Userslice";
import { addPost, addPosts } from "./PostSlice";

const AddPost = () => {
  const [title, seTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const newpost = () => {
    // dispatch(addPost(title, userId, content));
    dispatch(addPosts({ title, userId, body: content }));
    seTitle("");
    setContent("");
  };
  return (
    <form
      className=" w-[500px] p-1 mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className=" border w-full mt-3 p-1"
        type="text"
        placeholder=" Add title"
        value={title}
        onChange={(e) => seTitle(e.target.value)}
      />
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className=" border w-full my-2 p-1"
      >
        <option disabled value="">
          author
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <textarea
        placeholder=" Add content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className=" border w-full p-1"
      />
      <button className=" border w-full" onClick={newpost}>
        Save Post
      </button>
    </form>
  );
};

export default AddPost;

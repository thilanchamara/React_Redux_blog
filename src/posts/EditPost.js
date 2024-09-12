import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/Userslice";
import { addPosts, editPost, selectAllPosts } from "./PostSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddPost = () => {
  const users = useSelector(selectAllUsers);
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id === Number(postId));

  const [title, seTitle] = useState(post?.title);
  const [userId, setUserId] = useState(post?.userId);
  const [content, setContent] = useState(post?.body);

  const newpost = () => {
    // dispatch(addPost(title, userId, content));
    dispatch(
      editPost({
        id: post.id,
        title,
        userId,
        body: content,
        reactions: post.reactions,
      })
    );
    navigate(`/post/${postId}`);
  };
  return (
    <form
      className=" w-[500px] p-1 mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className=" text-3xl font-bold">ADD POSTS</h1>
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

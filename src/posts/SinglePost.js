import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts, selectAllPosts, selectPost } from "./PostSlice";
import Reactions from "./Reactions";
import CheckAuthor from "./CheckAuthor";
import { Link, useNavigate, useParams } from "react-router-dom";

const SinglePost = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();

  const post = posts.find((post) => post.id === Number(postId));

  // const post = useSelector((state) => selectPost(state, postId));
  const remove = () => {
    if (post) {
      dispatch(deletePost(post));
      navigate("/");
    }
  };
  const renderPost = post ? (
    <div className="w-[500px] border flex flex-col my-2 gap-2 p-1 ">
      <h1 className="text-2xl">{post.title}</h1>
      <p>{post.body}</p>
      <CheckAuthor userId={post.userId} />
      <Reactions post={post} />
      <div className=" flex justify-between ">
        <Link to={`/post/edit/${post.id}`} className=" underline">
          Edit
        </Link>
        <button className=" px-2 py-1 bg-cyan-300 rounded-md" onClick={remove}>
          Delete
        </button>
      </div>
    </div>
  ) : (
    <p>No post to display</p>
  );

  return (
    <div className=" container mx-auto flex justify-center items-center ">
      {renderPost}
    </div>
  );
};

export default SinglePost;

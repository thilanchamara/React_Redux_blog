import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectAllPosts } from "./PostSlice";
import Reactions from "./Reactions";
import CheckAuthor from "./CheckAuthor";
import { getUsers, selectAllUsers } from "../users/Userslice";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import TimeAgo from "./TimeAgo";

const Posts = () => {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const renderPosts = posts.map((post) => (
    <div
      className=" w-[500px] border flex flex-col my-2 gap-2 p-1"
      key={post.id}
    >
      <h1 className=" text-2xl">{post.title}</h1>
      <p>{post.body.substring(0, 100)}</p>
      <div className=" flex gap-2">
        <Link to={`post/${post.id}`} className=" underline">
          View post
        </Link>
        <CheckAuthor userId={post.userId} />
        <TimeAgo timestamp={post.dateTime} />
      </div>
      <Reactions post={post} />
    </div>
  ));

  return (
    <div className=" container mx-auto flex flex-col justify-center items-center">
      {renderPosts.reverse()}
    </div>
  );
};

export default Posts;

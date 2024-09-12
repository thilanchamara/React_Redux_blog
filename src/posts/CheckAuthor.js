import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./PostSlice";
import { selectAllUsers } from "../users/Userslice";

const CheckAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const user = users.find((item) => item.id == userId);

  return (
    <div>
      {/* <h3 className=" text-md">
        {post?.author ? post.author : "By unkonown author"}
      </h3> */}
      {user ? <h3>{`By ${user.name}`}</h3> : <h3>By unknown author</h3>}
    </div>
  );
};

export default CheckAuthor;

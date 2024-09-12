import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" bg-purple-400 text-white ">
      <div className=" flex justify-between container mx-auto py-1 items-center">
        <h1 className=" text-3xl font-bold ">React Blog</h1>
        <ul className=" flex text-xl gap-3 ">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/post"}>Post</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

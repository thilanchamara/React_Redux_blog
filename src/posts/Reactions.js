import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactionIncrement, selectAllPosts } from "./PostSlice";

const Reactions = ({ post }) => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();

  const emogis = {
    thumbsUp: "👍",
    wow: "😲",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };

  return (
    <div>
      {Object.entries(emogis).map(([name, emogi]) => (
        <button
          key={name}
          onClick={() =>
            dispatch(
              reactionIncrement({
                postId: post.id,
                name,
              })
            )
          }
        >
          {emogi} {post.reactions[name]}
        </button>
      ))}
    </div>
  );
};

export default Reactions;

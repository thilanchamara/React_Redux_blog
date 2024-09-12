import { Route, Routes } from "react-router-dom";
import AddPost from "./posts/AddPost";
import Posts from "./posts/Posts";
import Layout from "./components/Layout";
import SinglePost from "./posts/SinglePost";
import EditPost from "./posts/EditPost";

function App() {
  return (
    <div className=" ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} /> {/* Default route "/" */}
          <Route path="post">
            <Route index element={<AddPost />} /> {/* Route for "/post" */}
            <Route path=":postId" element={<SinglePost />} />
            <Route path="edit/:postId" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

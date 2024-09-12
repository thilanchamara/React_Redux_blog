import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/Store";
import { getUsers } from "./users/Userslice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getPosts } from "./posts/PostSlice";

store.dispatch(getUsers());
store.dispatch(getPosts());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

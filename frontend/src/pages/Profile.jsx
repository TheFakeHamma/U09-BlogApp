// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/blogs", {
          headers: { "x-auth-token": token },
        });
        setUserBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    const fetchLikedBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/liked-blogs",
          {
            headers: { "x-auth-token": token },
          }
        );
        setLikedBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/comments",
          {
            headers: { "x-auth-token": token },
          }
        );
        setComments(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUserBlogs();
    fetchLikedBlogs();
    fetchComments();
  }, [token, navigate]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Profile</h1>
      <h2 className="text-2xl font-bold mt-4">Your Blogs</h2>
      {userBlogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p>Category: {blog.category}</p>
          <p>Likes: {blog.likes.length}</p>
        </div>
      ))}
      <h2 className="text-2xl font-bold mt-4">Liked Blogs</h2>
      {likedBlogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p>Category: {blog.category}</p>
          <p>Likes: {blog.likes.length}</p>
        </div>
      ))}
      <h2 className="text-2xl font-bold mt-4">Your Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          <p>Blog: {comment.blogTitle}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;

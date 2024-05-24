// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).user.id : null;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchBlogs();
  }, []);

  const likeBlog = async (id) => {
    if (!token) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    try {
      await axios.put(`http://localhost:5000/api/blogs/like/${id}`, {}, config);
      setBlogs(
        blogs.map((blog) =>
          blog._id === id ? { ...blog, likes: [...blog.likes, userId] } : blog
        )
      );
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const unlikeBlog = async (id) => {
    if (!token) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    try {
      await axios.put(
        `http://localhost:5000/api/blogs/unlike/${id}`,
        {},
        config
      );
      setBlogs(
        blogs.map((blog) =>
          blog._id === id
            ? { ...blog, likes: blog.likes.filter((like) => like !== userId) }
            : blog
        )
      );
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p>Category: {blog.category}</p>
          <p>Author: {blog.author.name}</p>
          <p>Likes: {blog.likes.length}</p>
          {token ? (
            <>
              {blog.likes.includes(userId) ? (
                <button onClick={() => unlikeBlog(blog._id)}>Unlike</button>
              ) : (
                <button onClick={() => likeBlog(blog._id)}>Like</button>
              )}
            </>
          ) : (
            <p>Login to like this blog</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlogList;

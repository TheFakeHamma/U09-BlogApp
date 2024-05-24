// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).user.id : null;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogs/comment/${id}`
        );
        setComments(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const likeBlog = async () => {
    if (!token) {
      navigate("/login");
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
      setBlog({ ...blog, likes: [...blog.likes, userId] });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const unlikeBlog = async () => {
    if (!token) {
      navigate("/login");
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
      setBlog({ ...blog, likes: blog.likes.filter((like) => like !== userId) });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You need to be logged in to comment");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/blogs/comment/${id}`,
        { text: commentText },
        config
      );
      setComments(res.data);
      setCommentText("");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Category: {blog.category}</p>
      <p>Author: {blog.author.name}</p>
      <p>Likes: {blog.likes.length}</p>
      {token ? (
        <>
          {blog.likes.includes(userId) ? (
            <button onClick={unlikeBlog}>Unlike</button>
          ) : (
            <button onClick={likeBlog}>Like</button>
          )}
        </>
      ) : (
        <p>Login to like this blog</p>
      )}
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <p>By: {comment.user.name}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={addComment}>
        <div>
          <label>Add a Comment</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BlogDetail;

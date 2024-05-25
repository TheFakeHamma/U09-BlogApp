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
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).user.id : null;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
        setComments(res.data.comments);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchBlog();
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
      setBlog((prevBlog) => ({
        ...prevBlog,
        likes: [...prevBlog.likes, userId],
      }));
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
      setBlog((prevBlog) => ({
        ...prevBlog,
        likes: prevBlog.likes.filter((like) => like !== userId),
      }));
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
      await axios.post(
        `http://localhost:5000/api/blogs/comment/${id}`,
        { text: commentText },
        config
      );
      setCommentText("");
      window.location.reload(); // Refresh the page after adding a comment. Update this to use state instead later...
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const editComment = async (commentId) => {
    if (!token) {
      alert("You need to be logged in to edit comments");
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
        `http://localhost:5000/api/blogs/comment/${id}/${commentId}`,
        { text: editCommentText },
        config
      );
      setEditCommentId(null);
      setEditCommentText("");
      window.location.reload(); // Refresh the page after editing a comment. Update this to use state instead later...
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const deleteComment = async (commentId) => {
    if (!token) {
      alert("You need to be logged in to delete comments");
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
      await axios.delete(
        `http://localhost:5000/api/blogs/comment/${id}/${commentId}`,
        config
      );
      window.location.reload(); // Refresh the page after deleting a comment. Update this to use state instead later...
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      <p>Posted on: {formatDate(blog.createdAt)}</p>
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
            <p>
              By:{" "}
              {comment.user && typeof comment.user === "object"
                ? comment.user.name
                : comment.user}
            </p>
            <p>Commented on: {formatDate(comment.date)}</p>
            {token &&
              (comment.user._id
                ? comment.user._id === userId
                : comment.user === userId) && (
                <>
                  <button
                    onClick={() => {
                      setEditCommentId(comment._id);
                      setEditCommentText(comment.text);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteComment(comment._id)}>
                    Delete
                  </button>
                </>
              )}
            {editCommentId === comment._id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editComment(comment._id);
                }}
              >
                <textarea
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                />
                <button type="submit">Save</button>
              </form>
            )}
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

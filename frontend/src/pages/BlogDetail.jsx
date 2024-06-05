// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import BlogContent from "../components/BlogContent";
import CommentsSection from "../components/CommentsSection";
import { likeBlog, unlikeBlog } from "../utils/blogActions";
import {
  getBlog,
  addComment,
  editComment,
  deleteComment,
} from "../utils/blogApi";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).user.id : null;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog(id);
        setBlog(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLikeBlog = async () => {
    await likeBlog(id, token, userId, setBlog);
  };

  const handleUnlikeBlog = async () => {
    await unlikeBlog(id, token, userId, setBlog);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You need to be logged in to comment");
      return;
    }

    try {
      await addComment(id, commentText, token);
      setCommentText("");
      window.location.reload(); // Refresh the page after adding a comment. Update this to use state instead later...
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!token) {
      alert("You need to be logged in to edit comments");
      navigate("/login");
      return;
    }

    try {
      await editComment(id, commentId, editCommentText, token);
      setEditCommentId(null);
      setEditCommentText("");
      window.location.reload(); // Refresh the page after editing a comment. Update this to use state instead later...
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!token) {
      alert("You need to be logged in to delete comments");
      navigate("/login");
      return;
    }

    try {
      await deleteComment(id, commentId, token);
      window.location.reload(); // Refresh the page after deleting a comment. Update this to use state instead later...
    } catch (err) {
      console.error(err);
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
    <div className="container mx-auto p-4">
      <BlogContent
        blog={blog}
        formatDate={formatDate}
        userId={userId}
        likeBlog={handleLikeBlog}
        unlikeBlog={handleUnlikeBlog}
      />
      <CommentsSection
        comments={blog.comments}
        userId={userId}
        commentText={commentText}
        setCommentText={setCommentText}
        editCommentId={editCommentId}
        setEditCommentId={setEditCommentId}
        editCommentText={editCommentText}
        setEditCommentText={setEditCommentText}
        addComment={handleAddComment}
        editComment={handleEditComment}
        deleteComment={handleDeleteComment}
        formatDate={formatDate}
      />
    </div>
  );
}

export default BlogDetail;

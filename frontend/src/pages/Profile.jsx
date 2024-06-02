// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../components/ProfileSection";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userId = token ? jwtDecode(token).user.id : null;

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

  const likeBlog = async (id) => {
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
      setUserBlogs(
        userBlogs.map((blog) =>
          blog._id === id ? { ...blog, likes: [...blog.likes, userId] } : blog
        )
      );
      setLikedBlogs(
        likedBlogs.map((blog) =>
          blog._id === id ? { ...blog, likes: [...blog.likes, userId] } : blog
        )
      );
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const unlikeBlog = async (id) => {
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
      setUserBlogs(
        userBlogs.map((blog) =>
          blog._id === id
            ? { ...blog, likes: blog.likes.filter((like) => like !== userId) }
            : blog
        )
      );
      setLikedBlogs(
        likedBlogs.map((blog) =>
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <ProfileSection
        title="Your Blogs"
        items={userBlogs}
        formatDate={formatDate}
        userId={userId}
        likeBlog={likeBlog}
        unlikeBlog={unlikeBlog}
        itemType="blog"
      />
      <ProfileSection
        title="Liked Blogs"
        items={likedBlogs}
        formatDate={formatDate}
        userId={userId}
        likeBlog={likeBlog}
        unlikeBlog={unlikeBlog}
        itemType="blog"
      />
      <ProfileSection
        title="Your Comments"
        items={comments}
        itemType="comment"
      />
    </div>
  );
}

export default Profile;

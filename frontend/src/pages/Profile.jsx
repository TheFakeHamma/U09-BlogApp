// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../components/ProfileSection";
import jwtDecode from "jwt-decode";
import {
  fetchUserBlogs,
  fetchLikedBlogs,
  fetchComments,
} from "../utils/userApi";
import { likeBlog, unlikeBlog } from "../utils/blogActions";

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

    const loadData = async () => {
      try {
        const userBlogsData = await fetchUserBlogs(token);
        setUserBlogs(userBlogsData);

        const likedBlogsData = await fetchLikedBlogs(token);
        setLikedBlogs(likedBlogsData);

        const commentsData = await fetchComments(token);
        setComments(commentsData);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
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

  const handleLikeBlog = async (id) => {
    await likeBlog(id, token, userId, setUserBlogs);
    await likeBlog(id, token, userId, setLikedBlogs);
  };

  const handleUnlikeBlog = async (id) => {
    await unlikeBlog(id, token, userId, setUserBlogs);
    await unlikeBlog(id, token, userId, setLikedBlogs);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <ProfileSection
        title="Your Blogs"
        items={userBlogs}
        formatDate={formatDate}
        userId={userId}
        likeBlog={handleLikeBlog}
        unlikeBlog={handleUnlikeBlog}
        itemType="blog"
      />
      <ProfileSection
        title="Liked Blogs"
        items={likedBlogs}
        formatDate={formatDate}
        userId={userId}
        likeBlog={handleLikeBlog}
        unlikeBlog={handleUnlikeBlog}
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

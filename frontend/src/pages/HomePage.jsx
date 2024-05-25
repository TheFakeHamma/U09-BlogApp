// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogSection from "../components/BlogSection";
import { likeBlog, unlikeBlog } from "../utils/blogActions";
import { jwtDecode } from "jwt-decode";

function HomePage() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).user.id : null;

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/latest");
      setLatestBlogs(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleLikeBlog = async (id) => {
    await likeBlog(id, token, userId, setLatestBlogs);
    await fetchLatestBlogs();
  };

  const handleUnlikeBlog = async (id) => {
    await unlikeBlog(id, token, userId, setLatestBlogs);
    await fetchLatestBlogs();
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <BlogSection
        title="Latest Blogs"
        blogs={latestBlogs}
        formatDate={formatDate}
        userId={userId}
        likeBlog={handleLikeBlog}
        unlikeBlog={handleUnlikeBlog}
        showButton={true}
        buttonLink="/blogs"
      />
    </div>
  );
}

export default HomePage;

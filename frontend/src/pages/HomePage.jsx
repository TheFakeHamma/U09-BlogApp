// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogSection from "../components/BlogSection";

function HomePage() {
  const [topBlogs, setTopBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const fetchTopBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs/top");
        setTopBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    const fetchLatestBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs/latest");
        setLatestBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchTopBlogs();
    fetchLatestBlogs();
  }, []);

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
      <BlogSection title="Top Blogs" blogs={topBlogs} formatDate={formatDate} />
      <BlogSection
        title="Latest Blogs"
        blogs={latestBlogs}
        formatDate={formatDate}
        showButton={true}
        buttonLink="/blogs"
      />
    </div>
  );
}

export default HomePage;

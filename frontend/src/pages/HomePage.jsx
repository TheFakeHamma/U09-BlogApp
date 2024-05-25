// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <h1 className="text-3xl font-bold">Home Page</h1>
      <section>
        <h2 className="text-2xl font-bold">Top Blogs</h2>
        {topBlogs.map((blog) => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Category: {blog.category}</p>
            <p>Author: {blog.author.name}</p>
            <p>Likes: {blog.likes.length}</p>
            <p>Posted on: {formatDate(blog.createdAt)}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-2xl font-bold">Latest Blogs</h2>
        {latestBlogs.map((blog) => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Category: {blog.category}</p>
            <p>Author: {blog.author.name}</p>
            <p>Likes: {blog.likes.length}</p>
            <p>Posted on: {formatDate(blog.createdAt)}</p>
          </div>
        ))}
        <Link to="/blogs">
          <button className="mt-4 p-2 bg-blue-500 text-white">Show All</button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;

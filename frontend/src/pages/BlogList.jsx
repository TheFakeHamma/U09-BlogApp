// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [titleMatches, setTitleMatches] = useState([]);
  const [contentMatches, setContentMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).user.id : null;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogs/paginated?page=${page}`
        );
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
        const uniqueCategories = [
          ...new Set(res.data.blogs.map((blog) => blog.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchBlogs();
  }, [page]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs/search?query=${searchQuery}`
      );
      setTitleMatches(res.data.titleMatches);
      setContentMatches(res.data.contentMatches);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs?category=${selectedCategory}`
      );
      setTitleMatches(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

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
      setTitleMatches(
        titleMatches.map((blog) =>
          blog._id === id ? { ...blog, likes: [...blog.likes, userId] } : blog
        )
      );
      setContentMatches(
        contentMatches.map((blog) =>
          blog._id === id ? { ...blog, likes: [...blog.likes, userId] } : blog
        )
      );
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
      setTitleMatches(
        titleMatches.map((blog) =>
          blog._id === id
            ? { ...blog, likes: blog.likes.filter((like) => like !== userId) }
            : blog
        )
      );
      setContentMatches(
        contentMatches.map((blog) =>
          blog._id === id
            ? { ...blog, likes: blog.likes.filter((like) => like !== userId) }
            : blog
        )
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Blogs</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs..."
          className="border p-2"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
          Search
        </button>
      </form>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="border p-2 mt-4"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {submittedQuery && titleMatches.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold">
            Blogs with &quot;{submittedQuery}&quot; in title
          </h2>
          {titleMatches.map((blog) => (
            <div key={blog._id}>
              <h3>{blog.title}</h3>
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
      )}
      {submittedQuery && contentMatches.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold">
            Blogs with &quot;{submittedQuery}&quot; in content
          </h2>
          {contentMatches.map((blog) => (
            <div key={blog._id}>
              <h3>{blog.title}</h3>
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
      )}
      {submittedQuery &&
        titleMatches.length === 0 &&
        contentMatches.length === 0 && (
          <p>No blogs found matching your search criteria.</p>
        )}
      {(!submittedQuery ||
        (titleMatches.length === 0 && contentMatches.length === 0)) &&
        blogs.length > 0 && (
          <div>
            {blogs.map((blog) => (
              <div key={blog._id}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p>Category: {blog.category}</p>
                <p>Author: {blog.author.name}</p>
                <p>Likes: {blog.likes.length}</p>
                {token ? (
                  <>
                    {blog.likes.includes(userId) ? (
                      <button onClick={() => unlikeBlog(blog._id)}>
                        Unlike
                      </button>
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
        )}
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 ${
              index + 1 === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BlogList;

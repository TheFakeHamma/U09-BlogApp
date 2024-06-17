// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import BlogCard from "../components/BlogCard";
import Section from "../components/Section";
import { likeBlog, unlikeBlog } from "../utils/blogActions";
import {
  fetchBlogs,
  searchBlogs,
  fetchBlogsByCategory,
} from "../utils/blogApi";

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
  const [totalPagesTitle, setTotalPagesTitle] = useState(1);
  const [totalPagesContent, setTotalPagesContent] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalTitleMatches, setTotalTitleMatches] = useState(0);
  const [totalContentMatches, setTotalContentMatches] = useState(0);
  const [searchPageTitle, setSearchPageTitle] = useState(1);
  const [searchPageContent, setSearchPageContent] = useState(1);
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).user.id : null;

  useEffect(() => {
    const fetchInitialBlogs = async () => {
      try {
        const data = await fetchBlogs(page);
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
        setTotalBlogs(data.totalBlogs);
        const uniqueCategories = [
          ...new Set(data.blogs.map((blog) => blog.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
      }
    };

    if (!submittedQuery) {
      fetchInitialBlogs();
    }
  }, [page, submittedQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
    setSearchPageTitle(1);
    setSearchPageContent(1);
    try {
      const data = await searchBlogs(searchQuery, 1);
      setTitleMatches(data.titleMatches);
      setContentMatches(data.contentMatches);
      setTotalPagesTitle(data.totalPagesTitle);
      setTotalPagesContent(data.totalPagesContent);
      setTotalTitleMatches(data.totalTitleMatches);
      setTotalContentMatches(data.totalContentMatches);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    try {
      const data = await fetchBlogsByCategory(selectedCategory);
      setTitleMatches(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikeBlog = async (id) => {
    await likeBlog(id, token, userId, setBlogs);
  };

  const handleUnlikeBlog = async (id) => {
    await unlikeBlog(id, token, userId, setBlogs);
  };

  const handlePageChange = (newPage) => {
    if (submittedQuery) {
      setSearchPageTitle(newPage);
      setSearchPageContent(newPage);
    } else {
      setPage(newPage);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <form onSubmit={handleSearch} className="mb-4">
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
        className="border p-2 mb-4"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {submittedQuery && titleMatches.length > 0 && (
        <Section title={`Blogs with "${submittedQuery}" in title`}>
          {titleMatches.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              formatDate={formatDate}
              userId={userId}
              likeBlog={handleLikeBlog}
              unlikeBlog={handleUnlikeBlog}
            />
          ))}
          {totalPagesTitle > 1 && (
            <div className="mt-4">
              {Array.from({ length: totalPagesTitle }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`p-2 ${
                    index + 1 === searchPageTitle
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          <p>
            Showing {titleMatches.length} of {totalTitleMatches} blogs found in
            title
          </p>
        </Section>
      )}
      {submittedQuery && contentMatches.length > 0 && (
        <Section title={`Blogs with "${submittedQuery}" in content`}>
          {contentMatches.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              formatDate={formatDate}
              userId={userId}
              likeBlog={handleLikeBlog}
              unlikeBlog={handleUnlikeBlog}
            />
          ))}
          {totalPagesContent > 1 && (
            <div className="mt-4">
              {Array.from({ length: totalPagesContent }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`p-2 ${
                    index + 1 === searchPageContent
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          <p>
            Showing {contentMatches.length} of {totalContentMatches} blogs found
            in content
          </p>
        </Section>
      )}
      {submittedQuery &&
        titleMatches.length === 0 &&
        contentMatches.length === 0 && (
          <p>No blogs found matching your search criteria.</p>
        )}
      {!submittedQuery && blogs.length > 0 && (
        <Section title="All Blogs">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              formatDate={formatDate}
              userId={userId}
              likeBlog={handleLikeBlog}
              unlikeBlog={handleUnlikeBlog}
            />
          ))}
          {totalPages > 1 && (
            <div className="mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`p-2 ${
                    index + 1 === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          <p>
            Showing {blogs.length} of {totalBlogs} blogs
          </p>
        </Section>
      )}
    </div>
  );
}

export default BlogList;

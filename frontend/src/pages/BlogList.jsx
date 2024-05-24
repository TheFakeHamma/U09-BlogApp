// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p>Category: {blog.category}</p>
          <p>Author: {blog.author.name}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;

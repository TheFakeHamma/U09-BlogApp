// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";
import Pill from "./Pill";

const BlogCard = ({ blog, formatDate }) => {
  const truncateText = (text, length) => {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + "...";
  };

  const getPillColor = (category) => {
    switch (category.toLowerCase()) {
      case "general":
        return "bg-blue-500";
      case "tech":
        return "bg-green-500";
      case "lifestyle":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md hover:shadow-lg transition-shadow duration-300 relative flex flex-col">
      <div className="absolute top-4 right-4 text-sm text-gray-500 text-right">
        <p>{blog.author.name}</p>
        <p>{formatDate(blog.createdAt)}</p>
      </div>
      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
      <p className="text-gray-700 mb-4 flex-grow">
        {truncateText(blog.content, 150)}
      </p>
      <div className="absolute bottom-4 right-4 text-sm text-right">
        <p className="text-gray-700 mb-2">👍 {blog.likes.length}</p>
        <Pill text={blog.category} color={getPillColor(blog.category)} />
      </div>
      <Link to={`/blogs/${blog._id}`} className="mt-auto">
        <Button>Read More</Button>
      </Link>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default BlogCard;

// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";
import Pill from "./Pill";
import { Tooltip as ReactTooltip } from "react-tooltip";

const BlogCard = ({ blog, formatDate, userId, likeBlog, unlikeBlog }) => {
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

  const isLiked = blog.likes.includes(userId);

  return (
    <div className="bg-white p-6 rounded shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
          <p className="text-gray-700">{truncateText(blog.content, 150)}</p>
        </div>
        <div className="text-sm text-gray-500 text-right">
          <p>{blog.author.name}</p>
          <p>{formatDate(blog.createdAt)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <button
            onClick={() =>
              isLiked ? unlikeBlog(blog._id) : likeBlog(blog._id)
            }
            className="mr-2 text-xl"
            data-tooltip-id={`like-tooltip-${blog._id}`}
            data-tooltip-content={userId ? "" : "Log in to like"}
            disabled={!userId}
          >
            {isLiked ? "❤️" : "♡"}
          </button>
          <ReactTooltip
            id={`like-tooltip-${blog._id}`}
            place="top"
            type="dark"
            effect="solid"
          />
          <span>{blog.likes.length}</span>
        </div>
        <Pill text={blog.category} color={getPillColor(blog.category)} />
      </div>
      <Link to={`/blogs/${blog._id}`} className="mt-4">
        <Button>Read More</Button>
      </Link>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  likeBlog: PropTypes.func.isRequired,
  unlikeBlog: PropTypes.func.isRequired,
};

export default BlogCard;

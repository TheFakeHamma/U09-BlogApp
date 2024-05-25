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
        <div className="flex items-center mb-2">
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
      <Link to={`/blogs/${blog._id}`} className="mt-auto">
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

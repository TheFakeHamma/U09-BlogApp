// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Pill from "./Pill";
import { Tooltip as ReactTooltip } from "react-tooltip";

const BlogContent = ({ blog, userId, formatDate, likeBlog, unlikeBlog }) => {
  const isLiked = blog.likes.includes(userId);

  return (
    <div className="bg-white p-6 rounded shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-700 mb-4">{blog.content}</p>
        </div>
        <div className="text-sm text-gray-500 text-right">
          <p>{blog.author.name}</p>
          <p>{formatDate(blog.createdAt)}</p>
        </div>
      </div>
      <div className="mb-4">
        <Pill text={blog.category} color="bg-blue-500" />
      </div>
      <div className="flex items-center mb-4">
        <Button
          onClick={() => (isLiked ? unlikeBlog(blog._id) : likeBlog(blog._id))}
          className="mr-2 text-xl"
          data-tooltip-id={`like-tooltip-${blog._id}`}
          data-tooltip-content={userId ? "" : "Log in to like"}
          disabled={!userId}
        >
          {isLiked ? "❤️" : "♡"}
        </Button>
        <ReactTooltip
          id={`like-tooltip-${blog._id}`}
          place="top"
          type="dark"
          effect="solid"
        />
        <span>{blog.likes.length}</span>
      </div>
    </div>
  );
};

BlogContent.propTypes = {
  blog: PropTypes.object.isRequired,
  userId: PropTypes.string,
  formatDate: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  unlikeBlog: PropTypes.func.isRequired,
};

export default BlogContent;

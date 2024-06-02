// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CommentCard = ({ comment }) => {
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
    <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
      <p className="text-gray-700 mb-2">{comment.text}</p>
      <p className="text-sm text-gray-500 mb-2">
        By:{" "}
        {comment.user && typeof comment.user === "object"
          ? comment.user.name
          : comment.user}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Commented on: {formatDate(comment.date)}
      </p>
      <p className="text-lg font-bold text-gray-800 mb-2">
        Blog: {comment.blogTitle}
      </p>
      <div className="flex justify-end mt-2">
        <Link to={`/blogs/${comment.blog}`}>
          <button className="p-2 bg-blue-500 text-white rounded">
            Go to Blog
          </button>
        </Link>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    date: PropTypes.string.isRequired,
    blog: PropTypes.string.isRequired,
    blogTitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;

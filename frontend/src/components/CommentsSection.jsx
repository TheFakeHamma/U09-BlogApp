// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const CommentsSection = ({
  comments,
  userId,
  commentText,
  setCommentText,
  editCommentId,
  setEditCommentId,
  editCommentText,
  setEditCommentText,
  addComment,
  editComment,
  deleteComment,
  formatDate,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment._id} className="bg-gray-100 p-4 rounded shadow">
            <p className="text-gray-800">{comment.text}</p>
            <p className="text-gray-600 text-sm">
              By: {comment.user.name}
              <br />
              Commented on: {formatDate(comment.date)}
            </p>
            {userId === comment.user._id && (
              <div className="mt-2 flex space-x-2">
                <Button
                  onClick={() => {
                    setEditCommentId(comment._id);
                    setEditCommentText(comment.text);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteComment(comment._id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </div>
            )}
            {editCommentId === comment._id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editComment(comment._id);
                }}
                className="mt-4"
              >
                <textarea
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                />
                <Button type="submit" className="mt-2">
                  Save
                </Button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={addComment} className="mt-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Add a Comment
          </label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
            required
          />
        </div>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

CommentsSection.propTypes = {
  comments: PropTypes.array.isRequired,
  userId: PropTypes.string,
  commentText: PropTypes.string.isRequired,
  setCommentText: PropTypes.func.isRequired,
  editCommentId: PropTypes.string,
  setEditCommentId: PropTypes.func.isRequired,
  editCommentText: PropTypes.string.isRequired,
  setEditCommentText: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default CommentsSection;

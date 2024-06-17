// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import BlogCard from "./BlogCard";
import CommentCard from "./CommentCard";
import Button from "./Button";
import { Link } from "react-router-dom";

const ProfileSection = ({
  title,
  items,
  formatDate,
  userId,
  likeBlog,
  unlikeBlog,
  itemType,
  showButton,
  buttonLink,
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) =>
          itemType === "blog" ? (
            <BlogCard
              key={item._id}
              blog={item}
              formatDate={formatDate}
              userId={userId}
              likeBlog={likeBlog}
              unlikeBlog={unlikeBlog}
            />
          ) : (
            <CommentCard key={item._id} comment={item} />
          )
        )}
      </div>
      {showButton && (
        <div className="flex justify-center mt-4">
          <Link to={buttonLink}>
            <Button>Show All</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  formatDate: PropTypes.func,
  userId: PropTypes.string,
  likeBlog: PropTypes.func,
  unlikeBlog: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
  buttonLink: PropTypes.string,
};

ProfileSection.defaultProps = {
  showButton: false,
  buttonLink: "",
};

export default ProfileSection;

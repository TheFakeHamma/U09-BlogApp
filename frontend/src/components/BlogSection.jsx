// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import Button from "./Button";

const BlogSection = ({ title, blogs, formatDate, showButton, buttonLink }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} formatDate={formatDate} />
        ))}
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

BlogSection.propTypes = {
  title: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired,
  formatDate: PropTypes.func.isRequired,
  showButton: PropTypes.bool,
  buttonLink: PropTypes.string,
};

BlogSection.defaultProps = {
  showButton: false,
  buttonLink: "",
};

export default BlogSection;

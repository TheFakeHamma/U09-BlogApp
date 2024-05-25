// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavLink = ({ to, children, className = "", ...props }) => {
  return (
    <Link to={to} className={`text-white mx-2 ${className}`} {...props}>
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default NavLink;

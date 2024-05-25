// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const Pill = ({ text, color }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${color}`}
    >
      {text}
    </span>
  );
};

Pill.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Pill;

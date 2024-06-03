// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ label, name, value, onChange, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
      />
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

TextArea.defaultProps = {
  required: false,
};

export default TextArea;

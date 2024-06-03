// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const CategorySelect = ({
  label,
  selectedCategory,
  newCategory,
  onSelectedCategoryChange,
  onNewCategoryChange,
  categories,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        name="selectedCategory"
        value={selectedCategory}
        onChange={onSelectedCategoryChange}
        required={!newCategory}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
      >
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="newCategory"
        value={newCategory}
        onChange={onNewCategoryChange}
        placeholder="Or enter a new category"
        required={!selectedCategory}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

CategorySelect.propTypes = {
  label: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  newCategory: PropTypes.string.isRequired,
  onSelectedCategoryChange: PropTypes.func.isRequired,
  onNewCategoryChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  categories: PropTypes.array.isRequired,
};

CategorySelect.defaultProps = {
  required: false,
};

export default CategorySelect;

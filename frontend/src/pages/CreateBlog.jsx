// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import CategorySelect from "../components/CategorySelect";
import Button from "../components/Button";
import { fetchCategories, createBlog } from "../utils/blogApi";

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    selectedCategory: "",
    newCategory: "",
  });
  const [categories, setCategories] = useState([]);

  const { title, content, selectedCategory, newCategory } = formData;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  const onSelectedCategoryChange = (e) =>
    setFormData({
      ...formData,
      selectedCategory: e.target.value,
      newCategory: "",
    });

  const onNewCategoryChange = (e) =>
    setFormData({
      ...formData,
      newCategory: e.target.value,
      selectedCategory: "",
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const category = newCategory || selectedCategory;

    if (!category) {
      alert("Please select or enter a category");
      return;
    }

    try {
      await createBlog({ ...formData, category }, token);
      alert("Blog created successfully");
      setFormData({
        title: "",
        content: "",
        selectedCategory: "",
        newCategory: "",
      }); // Reset form
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Blog</h1>
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <InputField
          label="Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <TextArea
          label="Content"
          name="content"
          value={content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
        />
        <CategorySelect
          label="Category"
          selectedCategory={selectedCategory}
          newCategory={newCategory}
          onSelectedCategoryChange={onSelectedCategoryChange}
          onNewCategoryChange={onNewCategoryChange}
          required
          categories={categories}
        />
        <div className="flex justify-center">
          <Button type="submit">Create Blog</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;

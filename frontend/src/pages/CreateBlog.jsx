// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const { title, content, category } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    try {
      await axios.post("http://localhost:5000/api/blogs", formData, config);
      alert("Blog created successfully");
      setFormData({ title: "", content: "", category: "" }); // Reset form
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea name="content" value={content} onChange={onChange} required />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
}

export default CreateBlog;

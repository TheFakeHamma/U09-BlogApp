// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };

      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/me",
          config
        );
        setFormData({
          name: res.data.name,
          email: res.data.email,
        });
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchProfile();
  }, []);

  const { name, email } = formData;

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
      await axios.put("http://localhost:5000/api/users/me", formData, config);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default Profile;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md">
        <form
          onSubmit={onSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
          <InputField
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <div className="flex items-center justify-between">
            <Button type="submit">Register</Button>
            <a
              href="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

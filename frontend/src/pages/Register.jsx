// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../utils/userApi";

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
      console.log("Registering user:", formData);
      const res = await registerUser(formData);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      // Display error message to user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
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
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <Button type="submit" className="mb-4 sm:mb-0">
              Register
            </Button>
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

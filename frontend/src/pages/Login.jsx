// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../utils/userApi";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      login(res.token);
      navigate("/");
    } catch (err) {
      toast.error(err.msg || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={onSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
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
              Login
            </Button>
            <a
              href="/forgot-password"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

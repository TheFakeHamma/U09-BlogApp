// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { forgotPassword } from "../utils/userApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setMessage(res.msg);
    } catch (err) {
      console.error(err);
      setMessage("Error sending email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md">
        <form
          onSubmit={onSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-center text-2xl font-bold mb-6">
            Forgot Password
          </h2>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Send Reset Link</Button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

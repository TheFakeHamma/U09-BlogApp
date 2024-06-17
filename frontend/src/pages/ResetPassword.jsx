// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { resetPassword } from "../utils/userApi";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, password);
      setMessage(res.msg);
    } catch (err) {
      console.error(err);
      setMessage("Error resetting password");
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
            Reset Password
          </h2>
          <InputField
            label="New Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Reset Password</Button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

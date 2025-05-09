"use client";

import { loginUser, registerUser } from "@/lib/api";
import { useState } from "react";

export default function Home() {
  // Track form values
  const [form, setForm] = useState({ username: "", password: "" });

  // Track validation errors
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  // Track server response message
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({}); // Clear errors on input change
  };

  // Handle register logic
  const handleRegister = async () => {
    const newErrors: typeof errors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await registerUser(form); // send to backend
      setMessage(res);
    } catch (err) {
      setMessage("Registration failed.");
    }
  };

  // Handle login logic
  const handleLogin = async () => {
    const newErrors: typeof errors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await loginUser(form); // send to backend
      setMessage(res);
    } catch (err) {
      setMessage("Login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Login / Register</h1>

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full border p-2 mb-1 rounded"
      />
      {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username}</p>}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full border p-2 mb-1 rounded"
      />
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleRegister}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          Register
        </button>
        <button
          onClick={handleLogin}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}

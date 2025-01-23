"use client";
import { redirect } from "next/navigation"; // استخدم redirect في Next.js 15 (App Router)
import { useState } from "react";

const ADMIN_EMAILS = [
  "fivejewels",
  "fivejewels2",  // أضف البريد الثاني هنا
  "fivejewels3",  // أضف البريد الثالث هنا
];

const ADMIN_PASSWORD = "five@2030";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    // تحقق من أن البريد الإلكتروني موجود في قائمة البريد الإلكتروني المسموح بها
    if (ADMIN_EMAILS.includes(email) && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminEmail", email);
      redirect("/en/dashboard"); // استخدام redirect بدلاً من router.push
    } else {
      setError("Unauthorized access. Only the admin can log in.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;

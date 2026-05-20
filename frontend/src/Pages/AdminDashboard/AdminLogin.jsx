import React, { useState } from "react";
import s from "./Admin.module.css";

const AdminLogin = ({ onLoginSuccess }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === "admin" && user.password === "admin") {
      onLoginSuccess();
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className={s.loginContainer}>
      <div className={s.loginCard}>
        <div className={s.loginHeader}>
          <span className={s.adminIcon}>🔐</span>
          <h1>Admin Portal</h1>
          <p>Please enter your credentials to manage the election.</p>
        </div>
        <form onSubmit={handleLogin} className={s.loginForm}>
          <div className={s.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>
          <div className={s.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className={s.loginBtn}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

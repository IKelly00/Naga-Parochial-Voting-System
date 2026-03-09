import React, { useState } from "react";
import Logo from "../../assets/Image/logo.png";
import { User, LockKeyhole, MoveRight, X, Eye } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (e) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };

  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <header>
        <div className="img-container">
          <img src={Logo} className="logo" width="50" height="50"></img>
          <p className="school-name">Naga Parochial School</p>
        </div>
        <div className="nav-links">
          <button
            className="vote-btn"
            id="voteNow"
            href="#"
            onClick={toggleModal}
          >
            Vote Now
          </button>
        </div>
      </header>

      <div
        className="login-modal"
        id="login-modal"
        style={{ display: isModalOpen ? "flex" : "none" }}
      >
        <div className="main-container">
          <button className="close-btn" onClick={toggleModal}>
            <X size={20} />
          </button>

          <h1 className="login-header">Login</h1>
          <p className="login-subtitle">
            Please enter your credentials to continue
          </p>

          <form action="/login" method="POST" id="loginForm">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <LockKeyhole className="input-icon" size={18} />
                <input
                  type={showPassword ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
                <Eye
                  className="show-password"
                  id="show-password"
                  onClick={togglePassword}
                  size={18}
                />
              </div>
            </div>

            <button type="submit" className="btn">
              Login <MoveRight size={18} />
            </button>

            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;

import React, { useState } from "react";
import Logo from "../../../assets/Image/logo.png";
import { User, LockKeyhole, MoveRight, X, Eye } from "lucide-react";
import styles from "./Header.module.css";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ schoolName = "Naga Parochial School" }) => {
  const navigate = useNavigate();

  const handlleLogin = (e) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
    navigate("/dashboard");
  };

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
      <header id="header">
        <Link to="/">
          <div className={styles.imgContainer}>
            <img
              src={Logo}
              className={styles.logo}
              width="50"
              height="50"
            ></img>
            <p className={styles.schoolName}>{schoolName}</p>
          </div>
        </Link>
        <div className={styles.navLinks}>
          <Link to="/results">
            <button className={styles.resultBtn} id="voteNow">
              Results
            </button>
          </Link>
          <button
            className={styles.navBtn}
            id="voteNow"
            href="#"
            onClick={toggleModal}
          >
            Login
          </button>
        </div>
      </header>

      <div
        className={styles.loginModal}
        id="login-modal"
        style={{ display: isModalOpen ? "flex" : "none" }}
      >
        <div className={styles.mainContainer}>
          <button className={styles.closeBtn} onClick={toggleModal}>
            <X size={20} />
          </button>

          <h1 className={styles.loginHeader}>Login</h1>
          <p className={styles.loginSubtitle}>
            Please enter your credentials to continue
          </p>

          <form
            action="/login"
            method="POST"
            id="loginForm"
            onSubmit={handlleLogin}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={18} />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  autoComplete="current-username"
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <LockKeyhole className={styles.inputIcon} size={18} />
                <input
                  type={showPassword ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <Eye
                  className={styles.showPassword}
                  id="show-password"
                  onClick={togglePassword}
                  size={18}
                />
              </div>
            </div>

            <button type="submit" className={styles.btn}>
              Login <MoveRight size={18} />
            </button>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;

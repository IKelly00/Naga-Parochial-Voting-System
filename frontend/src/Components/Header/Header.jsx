import React, { useState } from "react";
import Logo from "../../assets/Image/logo.png";
import { User, LockKeyhole, MoveRight, X, Eye } from "lucide-react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const goBackHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handlleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const showResult = (e) => {
    e.preventDefault();
    navigate("/results");
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
        <div className={styles.imgContainer} onClick={goBackHome}>
          <img src={Logo} className={styles.logo} width="50" height="50"></img>
          <p className={styles.schoolName}>Naga Parochial School</p>
        </div>
        <div className={styles.navLinks}>
          <button
            className={styles.resultBtn}
            id="voteNow"
            onClick={showResult}
          >
            Results
          </button>
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

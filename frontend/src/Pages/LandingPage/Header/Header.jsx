import React, { useState } from "react";
import Logo from "../../../assets/Image/logo.png";
import { User, LockKeyhole, MoveRight, X, Eye, EyeOff } from "lucide-react";
import styles from "./Header.module.css";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ schoolName = "Naga Parochial School" }) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const toggleModal = (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(!isModalOpen);
    setError("");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsModalOpen(false);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header id="header" className={styles.header}>
        <Link to="/">
          <div className={styles.imgContainer}>
            <img
              src={Logo}
              className={styles.logo}
              width="50"
              height="50"
              alt="Logo"
            />
            <p className={styles.schoolName}>{schoolName}</p>
          </div>
        </Link>
        <div className={styles.navLinks}>
          <Link to="/results">
            <button className={styles.resultBtn}>Results</button>
          </Link>
          <button className={styles.navBtn} onClick={toggleModal}>
            Login
          </button>
        </div>
      </header>

      {/* Login Modal */}
      {isModalOpen && (
        <div className={styles.loginModal}>
          <div className={styles.mainContainer}>
            <button className={styles.closeBtn} onClick={toggleModal}>
              <X size={20} />
            </button>

            <h1 className={styles.loginHeader}>Login</h1>
            <p className={styles.loginSubtitle}>
              Please enter your credentials to continue
            </p>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form id="loginForm" onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} size={18} />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWrapper}>
                  <LockKeyhole className={styles.inputIcon} size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? "Verifying..." : "Login"} <MoveRight size={18} />
              </button>

              <div className={styles.forgotPassword}>
                <a href="#forgot">Forgot password?</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

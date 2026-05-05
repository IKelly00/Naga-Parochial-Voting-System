import React, { useState } from "react";
import s from "./DashboardHeader.module.css";
import logo from "../../assets/Image/logo.png";
import { useNavigate, Link } from "react-router-dom";

const DashboardHeader = () => {
  const [active, setActive] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <nav className={s.navbar}>
        <div className={s.navContent}>
          <div className={s.logoSection}>
            <img src={logo} alt="NPS Logo" className={s.logo} />
            <span className={s.schoolName}>Naga Parochial School</span>
          </div>

          <div className={s.navLinks}>
            <Link to="/dashboard">
              <button
                className={`${s.navItem} ${active === "dashboard" ? s.activeColor : ""}`}
                onClick={() => setActive("dashboard")}
              >
                Dashboard
              </button>
            </Link>
            <Link to="/user_results">
              <button
                className={s.resultsBtn}
                onClick={() => setActive("results")}
              >
                Results
              </button>
            </Link>
            <div className={s.divider}></div>
            <button className={s.logoutBtn} onClick={() => setShowModal(true)}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      {showModal && (
        <div className={s.modalOverlay}>
          <div className={s.modalCard}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out of the NPS Election System?</p>
            <div className={s.modalActions}>
              <button
                className={s.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className={s.confirmBtn} onClick={logout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;

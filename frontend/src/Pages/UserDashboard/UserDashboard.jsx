import React from "react";
import s from "./UserDashboard.module.css";

const UserDashboard = () => {
  const infoCards = [
    { label: "Election Date", val: "June 15, 2026", icon: "🗓️" },
    { label: "Voting Hours", val: "8:00 AM – 4:00 PM", icon: "⏰" },
    { label: "Your Precinct", val: "NPS Chapel", icon: "📍" },
    { label: "Status", val: "Not Yet Voted", icon: "📥" },
  ];

  return (
    <div className={s.heroContainer}>
      {/* Glassmorphism Welcome Panel */}
      <div className={s.welcomePanel}>
        <div className={s.infoSide}>
          <div className={s.badge}>● PROFILE OVERVIEW</div>
          <h1>Welcome, Guest!</h1>
          <p>
            Voter ID: <strong>NPS-2026-001</strong>
          </p>
        </div>
        <div className={s.actionSide}>
          <div className={s.statusTag}>⌛ Vote Pending</div>
          <button className={s.voteBtn}>🗳️ Cast Your Vote</button>
        </div>
      </div>

      {/* Info Grid */}
      <div className={s.infoGrid}>
        {infoCards.map((card, i) => (
          <div key={i} className={s.card}>
            <div className={s.icon}>{card.icon}</div>
            <span className={s.label}>{card.label}</span>
            <span className={s.value}>{card.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;

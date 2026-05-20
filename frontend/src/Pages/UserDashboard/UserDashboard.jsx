import React, { useState, useEffect } from "react";
import s from "./UserDashboard.module.css";
import { useNavigate, Link } from "react-router-dom";

const UserDashboard = () => {
  const [filter, setFilter] = useState("All");
  const [user, setUser] = useState(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const positions = [
    // SCO Positions
    {
      title: "President",
      org: "SCO",
      candidatesCount: 3,
      description:
        "Leads the Student Council Officers and oversees all student activities.",
      candidates: ["Maria Santos", "Roberto Cruz", "Elena Reyes"],
    },
    {
      title: "Vice President",
      org: "SCO",
      candidatesCount: 2,
      description:
        "Assists the President and assumes duties in the President's absence.",
      candidates: ["Jose Garcia", "Carmen Dela Rosa"],
    },
    {
      title: "Secretary",
      org: "SCO",
      candidatesCount: 2,
      description:
        "Maintains records, minutes of meetings, and handles correspondence.",
      candidates: ["Angela Villanueva", "Pedro Ramos"],
    },
    {
      title: "Treasurer",
      org: "SCO",
      candidatesCount: 2,
      description:
        "Manages the council's funds, maintains financial records, and prepares reports.",
      candidates: ["Lito Dimaculangan", "Sonia Bautista"],
    },
    {
      title: "Auditor",
      org: "SCO",
      candidatesCount: 2,
      description:
        "Examines and verifies financial accounts to ensure accuracy and transparency.",
      candidates: ["Ricardo Dalisay", "Gina Pareño"],
    },
    {
      title: "P.I.O.",
      org: "SCO",
      candidatesCount: 2,
      description:
        "Handles external communications and ensures the community is informed of activities.",
      candidates: ["Andres Bonifacio", "Teresa Magna"],
    },
    // SSG Positions
    {
      title: "President",
      org: "SSG",
      candidatesCount: 2,
      description:
        "Supreme Student Government head responsible for school-wide policy advocacy.",
      candidates: ["Lito Dimaculangan", "Sonia Bautista"],
    },
    {
      title: "Senior Vice-President",
      org: "SSG",
      candidatesCount: 2,
      description:
        "Primary assistant to the SSG President focusing on senior high affairs.",
      candidates: ["Ricardo Dalisay", "Gina Pareño"],
    },
    {
      title: "Junior Vice-President",
      org: "SSG",
      candidatesCount: 2,
      description:
        "Focuses on junior high representation and internal government affairs.",
      candidates: ["Andres Bonifacio", "Teresa Magna"],
    },
    {
      title: "Secretary",
      org: "SSG",
      candidatesCount: 2,
      description:
        "Oversees official SSG documentation and coordinates between departments.",
      candidates: ["Apolinario Mabini", "Emilio Jacinto"],
    },
    {
      title: "Treasurer",
      org: "SSG",
      candidatesCount: 2,
      description:
        "Custodian of SSG funds and lead for school-wide project budgeting.",
      candidates: ["Mariano Ponce", "Galicano Apacible"],
    },
    {
      title: "Auditor",
      org: "SSG",
      candidatesCount: 2,
      description:
        "Ensures fiscal responsibility and accountability in all SSG expenditures.",
      candidates: ["Graciano Lopez Jaena", "Jose Ma. Panganiban"],
    },
    {
      title: "P.I.O.",
      org: "SSG",
      candidatesCount: 2,
      description:
        "Voice of the SSG; manages school-wide announcements and social relations.",
      candidates: ["Ramon Magsaysay", "Carlos P. Romulo"],
    },
  ];

  const filteredPositions =
    filter === "All"
      ? positions
      : positions.filter((pos) => pos.org === filter);

  // Logic to check if user has voted
  const hasVoted = user?.isAlreadyVoted === true || user?.isAlreadyVoted === 1;

  return (
    <div className={s.heroContainer}>
      <div className={s.welcomePanel}>
        <div className={s.infoSide}>
          <div className={s.badge}>● PROFILE OVERVIEW</div>
          <h1>
            Welcome,{" "}
            {user && user.full_name ? user.full_name.split(" ")[0] : "Guest"}!
          </h1>
        </div>
        <div className={s.actionSide}>
          {/* Change text based on database status */}
          <div className={`${s.statusTag} ${hasVoted ? s.votedTag : ""}`}>
            {hasVoted ? "✅ Already Voted" : "⌛ Vote Pending"}
          </div>

          {/* Disable button and Link if already voted */}
          {hasVoted ? (
            <button className={s.disabledBtn} disabled>
              🗳️ Cast Your Vote
            </button>
          ) : (
            <Link to="/vote">
              <button className={s.voteBtn}>🗳️ Cast Your Vote</button>
            </Link>
          )}
        </div>
      </div>

      <div className={s.filterContainer}>
        {["All", "SSG", "SCO"].map((type) => (
          <button
            key={type}
            className={filter === type ? s.activeFilter : s.filterBtn}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {(filter === "All" || filter === "SSG") && (
        <div className={s.orgSection}>
          <div className={s.sectionHeader}>
            <h2>Supreme Student Government (SSG)</h2>
          </div>
          <div className={s.positionsGrid}>
            {filteredPositions
              .filter((p) => p.org === "SSG")
              .map((pos, index) => (
                <PositionCard key={`ssg-${index}`} pos={pos} />
              ))}
          </div>
        </div>
      )}

      {(filter === "All" || filter === "SCO") && (
        <div className={s.orgSection}>
          <div className={s.sectionHeader}>
            <h2 className={s.scoHeader}>Student Council Officers (SCO)</h2>
          </div>
          <div className={s.positionsGrid}>
            {filteredPositions
              .filter((p) => p.org === "SCO")
              .map((pos, index) => (
                <PositionCard key={`sco-${index}`} pos={pos} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PositionCard = ({ pos }) => (
  <div className={s.posCard}>
    <div className={s.posHeader}>
      <h3>{pos.title}</h3>
      <span className={s.countBadge}>{pos.candidatesCount} candidates</span>
    </div>
    <p className={s.posDesc}>{pos.description}</p>
    <div className={s.voteInstruction}>
      <span>✏️ Vote for 1 candidate</span>
    </div>
    <div className={s.candidateList}>
      {pos.candidates.map((name, i) => (
        <div key={i} className={s.candidateTag}>
          👤 {name}
        </div>
      ))}
    </div>
  </div>
);

export default UserDashboard;

import React, { useState } from "react";
import s from "./Vote.module.css";
import { Link } from "react-router-dom";

const Vote = () => {
  const [selections, setSelections] = useState({});
  const [showReview, setShowReview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positions = [
    {
      title: "President",
      desc: "Supreme Student Government head responsible for school-wide policy advocacy.",
    },
    {
      title: "Senior Vice-President",
      desc: "Primary assistant to the SSG President focusing on senior high affairs.",
    },
    {
      title: "Junior Vice-President",
      desc: "Focuses on junior high representation and internal government affairs.",
    },
    {
      title: "Secretary",
      desc: "Oversees official SSG documentation and coordinates departments.",
    },
    {
      title: "Treasurer",
      desc: "Custodian of SSG funds and lead for project budgeting.",
    },
    {
      title: "Auditor",
      desc: "Ensures fiscal responsibility and accountability in expenditures.",
    },
    {
      title: "P.I.O.",
      desc: "Voice of the SSG; manages announcements and social relations.",
    },
  ];

  const candidates = [
    {
      name: "Juan Luna",
      bio: "A dedicated leader with 3 years of experience in student leadership.",
    },
    {
      name: "Melchora Aquino",
      bio: "Passionate about student welfare and academic excellence for all students.",
    },
  ];

  const handleSelect = (position, candidateName) => {
    setSelections((prev) => ({ ...prev, [position]: candidateName }));
  };

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.id) {
      alert("Session expired. Please log in again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/cast-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: storedUser.id }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update localStorage with the new status from the database
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...storedUser,
            isAlreadyVoted: true,
          }),
        );

        setShowModal(true);
      } else {
        alert(data.message || "Failed to submit ballot.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Connection error. Please check your server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filledCount = Object.keys(selections).length;
  const totalPositions = positions.length;
  const progressPercentage = Math.round((filledCount / totalPositions) * 100);

  // Success Modal Component
  const SuccessModal = () => (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <div className={s.modalIcon}>🎉</div>
        <h2>Vote Successfully Cast</h2>
        <p>
          Your ballot has been securely recorded for the Naga Parochial Election
          2026.
        </p>
        <div className={s.modalActions}>
          <Link to="/dashboard">
            <button className={s.homeBtn}>Home</button>
          </Link>
          <Link to="/user_results">
            <button className={s.resultBtn}>View Results</button>
          </Link>
        </div>
      </div>
    </div>
  );

  // View: Compact Review Ballot
  if (showReview) {
    return (
      <div className={s.voteContainer}>
        {showModal && <SuccessModal />}
        <div className={s.header}>
          <h1> Review Your Ballot</h1>
          <p>Please verify your selections before final submission</p>
        </div>

        <div className={s.reviewWrapper}>
          <div className={s.reviewCard}>
            <div className={s.reviewCardHeader}>
              <h3>Naga Parochial Election 2026</h3>
              <p>Precinct: Immaculate Conception Chapel</p>
            </div>

            <div className={s.reviewGrid}>
              {positions.map((pos) => (
                <div key={pos.title} className={s.reviewItem}>
                  <span className={s.posLabel}>{pos.title.toUpperCase()}</span>
                  <div className={s.selectionRow}>
                    <span className={s.checkIcon}>✓</span>
                    <span className={s.candName}>
                      {selections[pos.title] || "Not Selected"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={s.confirmationBox}>
            <p>
              ✅ Your choices are saved. Review them carefully before
              submitting.
            </p>
          </div>

          <div className={s.footerActions}>
            <button
              className={s.backBtn}
              onClick={() => setShowReview(false)}
              disabled={isSubmitting}
            >
              ← Back to Ballot
            </button>
            <button
              className={s.submitBallotBtn}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : `Submit Final Ballot (${filledCount}/${totalPositions})`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View: Main Voting Interface
  return (
    <div className={s.voteContainer}>
      <div className={s.header}>
        <div className={s.topHeader}>
          <span>📋</span>
          <h1> Official Ballot</h1>
        </div>
        <p>Select your preferred candidates for each position below</p>
      </div>

      <div className={s.progressSection}>
        <div className={s.progressLabels}>
          <span>
            {filledCount} of {totalPositions} positions filled
          </span>
          <span>{progressPercentage}% complete</span>
        </div>
        <div className={s.barTrack}>
          <div
            className={s.barFill}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {positions.map((pos) => (
        <div key={pos.title} className={s.positionCard}>
          <div className={s.posHeader}>
            <h2>{pos.title}</h2>
            <span className={s.votePill}>Vote for 1</span>
          </div>
          <p className={s.posDescription}>{pos.desc}</p>

          <div className={s.candidateGrid}>
            {candidates.map((cand) => {
              const isSelected = selections[pos.title] === cand.name;
              return (
                <div
                  key={cand.name}
                  className={`${s.candidateCard} ${isSelected ? s.activeSelection : ""}`}
                  onClick={() => handleSelect(pos.title, cand.name)}
                >
                  <div className={s.radioCircle}>
                    {isSelected && <div className={s.radioDot} />}
                  </div>
                  <div className={s.avatarPlaceholder}>👤</div>
                  <h3>{cand.name}</h3>
                  <p className={s.candidateBio}>{cand.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className={s.bottomSubmit}>
        <button
          className={s.reviewBtn}
          disabled={filledCount < totalPositions}
          onClick={() => setShowReview(true)}
        >
          Review & Submit Ballot
        </button>
      </div>
    </div>
  );
};

export default Vote;

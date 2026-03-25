import React, { useState, useEffect } from "react";
import s from "./Result.module.css";
import { Trophy } from "lucide-react";
import { electionData } from "./electionData";
import { motion, AnimatePresence } from "motion/react";

const Result = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [count, setCount] = useState(0);

  const orgTitles = {
    SCO: "Student Council Officers (SCO)",
    SSG: "Supreme Student Government (SSG)",
  };

  const organizationsToShow =
    activeTab === "All" ? ["SCO", "SSG"] : [activeTab];

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/get-count");
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch count:", error);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className={s.mainContainer}>
      <div className={s.mainContent}>
        <div className={s.topContent}>
          <div className={s.live}>LIVE RESULTS</div>
          <div className={s.heading}>
            <span>📊</span>
            <h1> Election Results</h1>
          </div>
          <p className={s.electionDesc}>
            Naga Parochial Election {new Date().getFullYear()} — Real-time vote
            tallying
          </p>
        </div>

        {/* Top Summary Cards */}
        <div className={s.cardContent}>
          <div className={s.cards}>
            <div className={s.cardsIcon}>🗳️</div>
            <div className={s.votesCount}>
              <h3 className={s.count}>0</h3>
              <p>TOTAL VOTES CAST</p>
            </div>
          </div>
          <div className={s.cards}>
            <div className={s.cardsIcon}>👥</div>
            <div className={s.votesCount}>
              <h3 className={s.count}>{count}</h3>
              <p>TOTAL CANDIDATES</p>
            </div>
          </div>
          <div className={s.cards}>
            <div className={s.cardsIcon}>📋</div>
            <div className={s.votesCount}>
              <h3 className={s.count}>6</h3>
              <p>CONTESTED POSITIONS</p>
            </div>
          </div>
        </div>

        <div className={s.container}>
          {/* 1. Filter Navigation */}
          <div className={s.filterBar}>
            {["All", "SCO", "SSG"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? s.activeTab : s.tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 2. Dynamic Organization Sections */}
          {organizationsToShow.map((org) => {
            // Get only the positions that belong to this SCO/SSG group
            const groupData = electionData.filter(
              (item) => item.organization === org,
            );

            if (groupData.length === 0) return null;

            return (
              <div key={org} className={s.orgGroup}>
                <h1 className={s.orgTitle}>{orgTitles[org]}</h1>

                {/* 3. The Tally Section (Dynamic mapping) */}
                {groupData.map((section, idx) => (
                  <div key={idx} className={s.tallySection}>
                    <div className={s.tallyHeader}>
                      <h2>{section.position}</h2>
                      <span className={s.totalVotesBadge}>
                        {section.totalVotes} total votes
                      </span>
                    </div>

                    <div className={s.tallyList}>
                      <AnimatePresence>
                        {" "}
                        {/* 2. Wrap for entry/exit animations */}
                        {[...section.candidates]
                          .sort((a, b) => b.votes - a.votes)
                          .map((candidate, index) => {
                            const percentage = (
                              (candidate.votes / section.totalVotes) *
                              100
                            ).toFixed(1);

                            return (
                              <motion.div
                                layout // 3. The magic prop for swapping animation
                                key={candidate.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 30,
                                }}
                                className={s.candidateRow}
                              >
                                <div className={s.rankBadge}>{index + 1}</div>

                                <div className={s.candidateInfo}>
                                  <div className={s.nameRow}>
                                    <span className={s.candidateName}>
                                      👤 {candidate.name}
                                    </span>
                                    {index === 0 && (
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={s.leadingBadge}
                                      >
                                        <Trophy size={12} /> LEADING
                                      </motion.span>
                                    )}
                                  </div>
                                </div>

                                <div className={s.progressWrapper}>
                                  <div className={s.progressBarBackground}>
                                    <motion.div
                                      className={s.progressBarFill}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      style={{
                                        backgroundColor: candidate.color,
                                      }}
                                    />
                                  </div>
                                  <span className={s.percentText}>
                                    {percentage}%
                                  </span>
                                </div>

                                <div className={s.voteResult}>
                                  <span className={s.voteNum}>
                                    {candidate.votes}
                                  </span>
                                  <span className={s.voteLabel}>VOTES</span>
                                </div>
                              </motion.div>
                            );
                          })}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;

import React from "react";
import s from "./Result.module.css";
import { Trophy } from "lucide-react";

const Result = () => {
  const electionData = [
    {
      position: "President",
      totalVotes: 610,
      candidates: [
        {
          id: 1,
          name: "Maria Santos",
          party: "Unity for Progress",
          votes: 245,
          color: "#2563eb",
        },
        {
          id: 2,
          name: "Roberto Cruz",
          party: "Parish First",
          votes: 198,
          color: "#dc2626",
        },
        {
          id: 3,
          name: "Elena Reyes",
          party: "Faithful Servants",
          votes: 167,
          color: "#059669",
        },
      ],
    },
    {
      position: "Vice President",
      totalVotes: 399,
      candidates: [
        {
          id: 4,
          name: "Jose Garcia",
          party: "Unity for Progress",
          votes: 210,
          color: "#2563eb",
        },
        {
          id: 5,
          name: "Carmen Dela Rosa",
          party: "Parish First",
          votes: 189,
          color: "#dc2626",
        },
      ],
    },
    {
      position: "Secretary",
      totalVotes: 405,
      candidates: [
        {
          id: 6,
          name: "Angela Villanueva",
          party: "Faithful Servants",
          votes: 230,
          color: "#059669",
        },
        {
          id: 7,
          name: "Pedro Ramos",
          party: "Unity for Progress",
          votes: 175,
          color: "#2563eb",
        },
      ],
    },
    {
      position: "Auditor",
      totalVotes: 393,
      candidates: [
        {
          id: 10,
          name: "Francisco Torres",
          party: "Unity for Progress",
          votes: 205,
          color: "#2563eb",
        },
        {
          id: 11,
          name: "Isabella Navarro",
          party: "Parish First",
          votes: 188,
          color: "#dc2626",
        },
      ],
    },
  ];

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
              <h3 className={s.count}>1,414</h3>
              <p>TOTAL VOTES CAST</p>
            </div>
          </div>
          <div className={s.cards}>
            <div className={s.cardsIcon}>👥</div>
            <div className={s.votesCount}>
              <h3 className={s.count}>17</h3>
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

        {/* Dynamic Tally Sections */}
        {electionData.map((section, idx) => (
          <div key={idx} className={s.tallySection}>
            <div className={s.tallyHeader}>
              <h2>{section.position}</h2>
              <span className={s.totalVotesBadge}>
                {section.totalVotes} total votes
              </span>
            </div>

            <div className={s.tallyList}>
              {section.candidates.map((candidate, index) => {
                const percentage = (
                  (candidate.votes / section.totalVotes) *
                  100
                ).toFixed(1);
                return (
                  <div key={candidate.id} className={s.candidateRow}>
                    <div className={s.rankBadge}>{index + 1}</div>

                    <div className={s.candidateInfo}>
                      <div className={s.nameRow}>
                        <span className={s.candidateName}>
                          👩‍💼 {candidate.name}
                        </span>
                        {index === 0 && (
                          <span className={s.leadingBadge}>
                            <Trophy size={12} /> LEADING
                          </span>
                        )}
                      </div>
                      <p className={s.partyName}>{candidate.party}</p>
                    </div>

                    <div className={s.progressWrapper}>
                      <div className={s.progressBarBackground}>
                        <div
                          className={s.progressBarFill}
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: candidate.color,
                          }}
                        ></div>
                      </div>
                      <span className={s.percentText}>{percentage}%</span>
                    </div>

                    <div className={s.voteResult}>
                      <span className={s.voteNum}>{candidate.votes}</span>
                      <span className={s.voteLabel}>VOTES</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;

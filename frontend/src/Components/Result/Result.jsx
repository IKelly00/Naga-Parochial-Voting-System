import React from "react";
import s from "./Result.module.css";
import { Link } from "react-router-dom";

const Result = () => {
  return (
    <>
      <div className={s.mainContainer}>
        <div className={s.mainContent}>
          <div className={s.topContent}>
            <div className={s.live}>LIVE RESULTS</div>
            <div className={s.heading}>
              {/* <span>📊</span> */}
              <h1> Election Results</h1>
            </div>
            <p className={s.electionDesc}>
              Naga Parochial Election {new Date().getFullYear()} — Real-time
              vote tallying
            </p>
          </div>
          <div className={s.cardContent}>
            <div className={s.cards}>
              <div className={s.cardsIcon}>🗳️</div>
              <div className={s.votesCount}>
                <h3 className={s.count}>600</h3>
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
                <p>TOTAL CANDIDATES</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;

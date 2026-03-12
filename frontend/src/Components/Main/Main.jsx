import React from "react";
import MyVideo from "../../assets/Videos/Video.mp4";
import s from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";

const Main = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main className={s.homeContainer}>
        <div className={s.container}>
          <div className={s.header}>
            <h1 className={s.homeHeading}>Empowering Student Voices</h1>
            <p className={s.typingText}>
              Student Commission Campaign and Election
            </p>
          </div>
          <div className={s.cardContainer}>
            <div className={s.card}>
              <video
                controls
                autoPlay
                muted
                loop
                preload="metadata"
                src={MyVideo}
                className={s.npsVideo}
              ></video>
            </div>
          </div>
        </div>
      </main>

      <section className={s.featureBox}>
        <div className={s.featureContent}>
          <div className={s.box}>
            <div className={s.icon}>📝</div>
            <div className={s.info}>
              <h2 className={s.heading}>Register and Login</h2>
              <p className={s.description}>
                Enter your voter credentials to access the secure voting portal.
                Your identity is verified to ensure one vote per registered
                students voters.
              </p>
            </div>
          </div>
          <div className={s.box}>
            <div className={s.icon}>✅</div>
            <div className={s.info}>
              <h2 className={s.heading}>Select Candidates</h2>
              <p className={s.description}>
                Review candidate profiles and their platforms. Select your
                preferred candidates for each position in the Naga Parochial
                School.
              </p>
            </div>
          </div>
          <div className={s.box}>
            <div className={s.icon}>🔒</div>
            <div className={s.info}>
              <h2 className={s.heading}>Secure & Transparent</h2>
              <p className={s.description}>
                Your vote is encrypted and securely recorded. Results are
                tallied in real-time with complete transparency for all voters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className={s.footerContent}>
          <p className={s.footerText}>
            &copy; {new Date().getFullYear()} - Naga Parochial Election
            Commission. All rights reserved. Conducted with integrity and faith.
          </p>
          <a onClick={scrollToTop}>
            <ChevronUp strokeWidth={1} size={12} className={s.upIcon} />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Main;

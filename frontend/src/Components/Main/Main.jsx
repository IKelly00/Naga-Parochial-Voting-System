import React from "react";
import MyVideo from "../../assets/Videos/Video.mp4";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.homeHeading}>Empowering Student Voices</h1>
            <p className={styles.typingText}>
              Student Commission Campaign and Election
            </p>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <video
                controls
                autoPlay
                muted
                loop
                src={MyVideo}
                className={styles.npsVideo}
              ></video>
            </div>
            <div className={styles.cardButtons}>
              <button className={styles.cardBtn}>Learn More</button>
              <button className={styles.cardBtn}>View Candidates</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

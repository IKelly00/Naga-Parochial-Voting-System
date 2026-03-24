import React, { useState, useEffect } from "react";
import { campaignImages } from "../../../assets/Campaign/campaign";
import s from "./Main.module.css";
import { ChevronUp } from "lucide-react";

const Main = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === campaignImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? campaignImages.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [currentIndex]);

  return (
    <>
      <main className={s.homeContainer}>
        <div className={s.container}>
          <div className={s.header}>
            <h1 className={s.homeHeading}>Empowering Student Voices</h1>
            <p className={s.typingText}>
              <span>📃</span> Student Commission Campaign and Election
            </p>
          </div>
          <div className={s.cardContainer}>
            <div className={s.card}>
              <div className={s.sliderContainer}>
                <button className={s.leftArrow} onClick={prevSlide}>
                  &#10094;
                </button>
                <div className={s.npsImage}>
                  <img
                    src={campaignImages[currentIndex]}
                    alt={`Campaign ${currentIndex + 1}`}
                    fetchPriority="high"
                    rel="preload"
                  />
                </div>
                <button className={s.rightArrow} onClick={nextSlide}>
                  &#10095;
                </button>

                {/* Optional: Dots indicator */}
                <div className={s.dots}>
                  {campaignImages.map((_, index) => (
                    <span
                      key={index}
                      className={index === currentIndex ? s.activeDot : s.dot}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </div>
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

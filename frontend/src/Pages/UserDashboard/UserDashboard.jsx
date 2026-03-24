import React, { useState, useEffect } from "react";
import s from "./UserDashboard.module.css";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("/api/candidates");
        const data = await response.json();

        setCandidates(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch:", error);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <p>Loading Candidates...</p>;
  return (
    <div className="candidate-grid">
      {candidates.map((person) => (
        <div key={person.id} className="candidate-card">
          <h3>{person.name}</h3>
          <p>{person.party}</p>
          <span>Current Votes: {person.votes}</span>
          <button>Vote for {person.name}</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

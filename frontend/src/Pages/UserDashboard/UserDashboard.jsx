import React from "react";
import s from "./UserDashboard.module.css";
import Button from "../../Components/Buttons/Button";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Button text="Login" />
      </div>
    </>
  );
};

export default Dashboard;

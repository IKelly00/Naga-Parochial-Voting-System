import React from "react";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Main />
          </>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
};

export default App;

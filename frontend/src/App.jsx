import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./Routes/routes";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find(
      (route) =>
        route.path ===
        location.pathname.replace("/Naga-Parochial-Voting-System", ""),
    );
    if (currentRoute?.title) {
      document.title = currentRoute.title + " | Voting System";
    }
  }, [location.pathname]);

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default App;

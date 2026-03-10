import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import Login from "../Components/Header/Header";
import Main from "../Components/Main/Main";
import Learn from "../Components/Learn/Learn";
import Candidates from "../Components/Candidates/Candidates";

export const routes = [
  {
    id: 1,
    path: "/",
    element: (
      <>
        <Login />
        <Main />
      </>
    ),
    title: "Landing Page",
  },
  {
    id: 2,
    path: "/dashboard",
    element: (
      <>
        <Dashboard />
      </>
    ),
    title: "Dashboard",
  },
  {
    id: 3,
    path: "/learn",
    element: (
      <>
        <Login />
        <Learn />
      </>
    ),
    title: "Learn More",
  },
  {
    id: 4,
    path: "/candidates",
    element: (
      <>
        <Login />
        <Candidates />
      </>
    ),
    title: "Candidates",
  },
];

console.log(routes[2]);

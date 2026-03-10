import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import Login from "../Components/Header/Header";
import Main from "../Components/Main/Main";
import Learn from "../Components/Learn/Learn";

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
        <Login />
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
];

console.log(routes[2]);

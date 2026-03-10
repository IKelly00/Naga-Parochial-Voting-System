import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import Login from "../Components/Header/Header";
import Main from "../Components/Main/Main";

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
    element: <Dashboard />,
    title: "Dashboard",
  },
];

// console.log(routes[0]);

import UserDashboard from "../Pages/UserDashboard/UserDashboard";
import Login from "../Components/Header/Header";
import Main from "../Components/Main/Main";
import Result from "../Components/Result/Result";

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
        <UserDashboard />
      </>
    ),
    title: "Dashboard",
  },
  {
    id: 3,
    path: "/results",
    element: (
      <>
        <Login />
        <Result />
      </>
    ),
    title: "Live",
  },
];

// console.log(routes[2]);

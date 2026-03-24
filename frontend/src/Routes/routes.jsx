import UserDashboard from "../Pages/UserDashboard/UserDashboard";
import Header from "../Pages/LandingPage/Header/Header";
import Main from "../Pages/LandingPage/Main/Main";
import Result from "../Pages/LandingPage/Result/Result";

export const routes = [
  {
    path: "/",
    element: (
      <>
        <Header />
        <Main />
      </>
    ),
    title: "Landing Page",
  },
  {
    path: "/dashboard",
    element: (
      <>
        <UserDashboard />
      </>
    ),
    title: "Dashboard",
  },
  {
    path: "/results",
    element: (
      <>
        <Header />
        <Result />
      </>
    ),
    title: "Live",
  },
];

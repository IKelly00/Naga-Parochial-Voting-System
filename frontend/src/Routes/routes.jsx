import UserDashboard from "../Pages/UserDashboard/UserDashboard";
import Header from "../Pages/LandingPage/Header/Header";
import DashboardHeader from "../Pages/UserDashboard/DashboardHeader";
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
    path: "/results",
    element: (
      <>
        <Header />
        <Result />
      </>
    ),
    title: "Live",
  },
  {
    path: "/dashboard",
    element: (
      <>
        <DashboardHeader />
        <UserDashboard />
      </>
    ),
    title: "Dashboard",
  },
  {
    path: "/user_results",
    element: (
      <>
        <DashboardHeader />
        <Result />
      </>
    ),
    title: "Dashboard",
  },
];

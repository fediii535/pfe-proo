import { Route, Routes } from "react-router-dom";
// import Login from "../views/Login/Login";
// import Signup from "../views/Signup/Signup";
// import { IRouteItem } from "../types";
// import Home from "../views/Home/Home";
// import MainLayout from "../Layouts/MainLayout";
import { Fragment } from "react/jsx-runtime";
import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/register/SignUp";
import JobListing from "../pages/Dashboard/jobs/Jobs";
import MainLayout from "../Layouts/MainLayout";
import  CreateJob  from "../pages/Dashboard/jobs/JobCreate";
import  ReadJobs  from "../pages/Dashboard/jobs/ReadJobs";
import Leaves from "../pages/Dashboard/leaves/Leaves";
import Recording from "../pages/Dashboard/recording/Recording";
import Registrations from "../pages/Dashboard/registrations/Registrations";
import Settings from "../pages/Dashboard/Settings/Settings";
import Home from "../pages/Dashboard/Home/Home";
// import LeaveRequestForm from "../pages/Dashboard/Home/LeaveRequestForm";
import ViewMore from "../pages/Dashboard/registrations/ViewMore";
import Employee from "../pages/Dashboard/Employee/Employee";
import ApplyForJob from '../pages/Dashboard/Employee/CreateEmployee'

// import JobView from "../views/JobView/JobView";
// import Employees from "../views/Employees/Employees";
// import Recordings from "../views/Recordings/Recordings";
// import Registrations from "../views/Registrations/Registrations";
// import Leaves from "../views/Leaves/Leaves";
// import JobDetails from "../views/JobDetails/JobDetails";
// import CreateJob from "../views/createJob/CreateJob";
// import EditJob from "../views/EditJob/EditJob";
// import AdminGuard from "../Guards/AdminGuard";
// import ProfileSettings from "../views/ProfileSettings/ProfileSettings";
// import CreateSubmission from "../views/CreateSubmission/CreateSubmission";

// import AuthGuard from "../Guards/AuthGuard";
// import EmployeeDetails from "../views/EmployeeDetails/EmployeeDetails";
// import SubmissionDetails from "../views/SubmissionDetails/SubmissionDetails";
// import Dashboard from "../views/Dashboard/Dashboard";
// import RedirectByRole from "../views/HomePage";
// import LandingPage from "../views/LandingPage/LandingPage";
// import EmployeeGuard from "../Guards/EmployeeGuard";
// import Login from "./pages/auth/login/Login";
// import Signup from "./pages/auth/register/SignUp";

export const routes= [
  // {
  //   path: "/",
  //   element: <RedirectByRole />,
  // },
  {
    path: "/",
    element: <Home/>,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <JobListing />,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },
  {
    path: "/jobs/apply/:id",
    element: <ApplyForJob />,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },

  {
    path: "/jobs/create",
    element: <CreateJob />,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },
  {
    path: "/vue-more/:id",
    element: <ReadJobs />,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },
  {
    path: "/leaves",
    element: <Leaves />,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },
  {
    path: "/recordings",
    element: <Recording/>,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },
  {
    path: "/registrations",
    element: <Registrations/>,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },

  {
    path: "/vue-more/:id",
    element: <ViewMore />,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },
  {
    path: "/employee",
    element: <Employee />,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },



  {
    path: "/settings",
    element: <Settings/>,
    layout: MainLayout,
    // Guards: Au/thGuard,
  },
  // {
  //   path: "/users",
  //   element: <LeaveRequestForm/>,
  //   layout: MainLayout,
  //   // Guards: Au/thGuard,
  // },
];

export const renderRoutes = (routes) => {
  return (
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Guards = route.Guards || Fragment;
        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guards>
                <Layout>{route.element}</Layout>
              </Guards>
            }
          />
        );
      })}
    </Routes>
  );
};

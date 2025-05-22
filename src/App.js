import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./SignUp";
import Sidebar from "./Sidebar";
import Home from "../src/pages/Home/Home";
import Registrations from "../src/pages/registrations/Registrations";
import Leaves from "../src/pages/leaves/Leaves";
import Jobs from "../src/pages/jobs/Jobs"; 
import JobCreate from "../src/pages/jobs/JobCreate";
import Recording from "../src/pages/recording/Recording";
import Settings from "../src/pages/Settings/Settings";
import Employee from "../src/pages/Employee/Employee";
import LeaveRequestForm from "../src/pages/Home/LeaveRequestForm"; 
import ReadJobs from "../src/pages/jobs/ReadJobs";
import ViewMore from "./ViewMore";
import CreateClient from "./pages/Employee/CreateEmployee";
import Dashbord from './Dashbord';
import PrivateRoute from "./PrivateRoute"; // import du composant

// IMPORTANT: Ensure Supabase client is initialized ONCE in your app (singleton pattern).
// Only import the client from a single source (e.g., src/supabase/SupaBase.js) everywhere.
// Do NOT call createClient() in multiple files or components.

function App() {
  return (
    <Router basename="/pfe-prOo">
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes protégées */}
        <Route element={<PrivateRoute />}>
          <Route path="/sidebar" element={<Sidebar />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="registrations" element={<Registrations />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/create" element={<JobCreate />} />
            <Route path="jobs/read" element={<ReadJobs />} />
            <Route path="recording" element={<Recording />} />
            <Route path="settings" element={<Settings />} />
            <Route path="employee" element={<Employee />} />
            <Route path="dashbord" element={<Dashbord />} />
            <Route path="vue-more/:key" element={<ViewMore />} />
          </Route>

          <Route path="/leave-request" element={<LeaveRequestForm />} />
          <Route path="/view-more/:key" element={<ViewMore />} />
          <Route path="/CreateClient" element={<CreateClient />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

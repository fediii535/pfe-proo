import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./SignUp";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Registrations from "./Registrations";
import Leaves from "./Leaves";
import Jobs from "./Jobs";
import JobCreate from "./JobCreate";
import Recording from "./Recording";
import Settings from "./Settings";
import Employee from "./Employee";
import LeaveRequestForm from "./LeaveRequestForm";
import ReadJobs from "./ReadJobs"; // Import ReadJobs component

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes protégées avec Sidebar */}
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="registrations" element={<Registrations />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/create" element={<JobCreate />} />
          <Route path="jobs/read" element={<ReadJobs />} />{" "}
          {/* Add route for ReadJobs */}
          <Route path="recording" element={<Recording />} />
          <Route path="settings" element={<Settings />} />
          <Route path="employee" element={<Employee />} />
        </Route>

        {/* Route pour la page Leave Request */}
        <Route path="/leave-request" element={<LeaveRequestForm />} />
      </Routes>
    </Router>
  );
}

export default App;

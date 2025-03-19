// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './SignUp';
import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/sidebar"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
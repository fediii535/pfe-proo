import React from 'react';
import './Sidebar.css';
import { FaHome, FaUser, FaBriefcase, FaVideo, FaCog, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { IoIosCalendar } from 'react-icons/io';
import { useNavigate, Outlet } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Importez supabase

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/'); // Redirige vers la page de login après déconnexion
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar"> {/* Sidebar remains fixed */}
        <div className="sidebar-header">
          <h1 className='logo'>Yuna</h1>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item" onClick={() => navigate('/sidebar/home')}>
            <FaHome className="icon" />
            <span>Home</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/sidebar/registrations')}>
            <IoIosCalendar className="icon" />
            <span>Registrations</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/sidebar/leaves')}>
            <FaUser className="icon" />
            <span>Leaves</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/sidebar/jobs')}>
            <FaBriefcase className="icon" />
            <span>Jobs</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/sidebar/recording')}>
            <FaVideo className="icon" />
            <span>Recordings</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/sidebar/employee')}>
            <FaUsers className="icon" />
            <span>Employee</span>
          </div>
          <div style={{ marginTop: '12rem' }}> {/* Adjust margin to move further down */}
            <div className="menu-item" onClick={() => navigate('/sidebar/settings')}>
              <FaCog className="icon" />
              <span>Settings</span>
            </div>
            <div className="logout" onClick={handleLogout}>
              <FaSignOutAlt className="icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <Outlet /> {/* Main content scrolls independently */}
      </div>
    </div>
  );
};

export default Sidebar;
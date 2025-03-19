import React from 'react';
import './Sidebar.css';
import { FaHome, FaUser, FaBriefcase, FaVideo, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoIosPeople, IoIosCalendar } from 'react-icons/io';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="logo.png" alt="Company Logo" />
        </div>
        <h2>Home</h2>
      </div>
      <div className="sidebar-menu">
        <div className="menu-item">
          <FaHome className="icon" />
          <span>Registrations</span>
          <span className="count">10</span>
        </div>
        <div className="menu-item">
          <IoIosCalendar className="icon" />
          <span>Leaves</span>
        </div>
        <div className="menu-item">
          <FaUser className="icon" />
          <span>Employee</span>
        </div>
        <div className="menu-item">
          <FaBriefcase className="icon" />
          <span>Jobs</span>
        </div>
        <div className="menu-item">
          <FaVideo className="icon" />
          <span>Recordings</span>
        </div>
        <div className="menu-item">
          <FaCog className="icon" />
          <span>Settings</span>
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="user-info">
          <span className="user-name">Farouk Abichou</span>
          <span className="user-email">faroukabichou@gmail.com</span>
        </div>
        <div className="logout">
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
import React, { useState, useEffect } from "react";
import {
  Sun,
  AlertCircle,
  Lock,
  User,
  Settings,
  Scale,
  Search,
} from "lucide-react"; // Import the search icon
import "./Home.css";
import sickIcon from "./assets/image.png";
import personalIcon from "./assets/image1.png"; // Image remplacée ici
import casualIcon from "./assets/image2.png"; // Import the new image for Casual
import vacationIcon from "./assets/image3.png"; // Import the new image for Vacation
import { DatePicker, Modal, Select, Button } from "antd";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveData, setLeaveData] = useState(() => {
    const savedData = localStorage.getItem("leaveData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("leaveData", JSON.stringify(leaveData));
  }, [leaveData]);

  const openModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ fromDate: "", toDate: "", type: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.fromDate && formData.toDate && formData.type) {
      setLeaveData([
        ...leaveData,
        {
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          type: formData.type,
          status: "Pending",
        },
      ]);
      closeModal();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "Vacation":
        return (
          <img
            src={vacationIcon}
            alt="Vacation Icon"
            className="card-icon sun"
          />
        ); // Updated icon
      case "Casual":
        return (
          <img src={casualIcon} alt="Casual Icon" className="card-icon alert" />
        );
      case "Personal":
        return (
          <img
            src={personalIcon}
            alt="Personal Icon"
            className="card-icon lock"
          />
        );
      case "Sick":
        return (
          <img src={sickIcon} alt="Sick Icon" className="card-icon medical" />
        );
      default:
        return null;
    }
  };

  const getLeaveCountByType = (type) => {
    return leaveData.filter((leave) => leave.type === type).length;
  };
  const { RangePicker } = DatePicker;
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div className="home-container">
      <div className="main-content">
        <div className="page-title-container">
          <h1 className="page-title">Home</h1>
        </div>
        <div className="leave-balance-cards">
          <div className="card">
            <div className="card-header">
              <span>Vacation</span>
              <span className="menu-dots">⋮</span>
            </div>
            <div className="card-content">
              <img
                src={vacationIcon}
                alt="Vacation Icon"
                className="card-icon sun"
              />
              <span className="card-value">
                {getLeaveCountByType("Vacation")}
              </span>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span>Casual</span>
              <span className="menu-dots">⋮</span>
            </div>
            <div className="card-content">
              <img
                src={casualIcon}
                alt="Casual Icon"
                className="card-icon alert"
              />
              <span className="card-value">
                {getLeaveCountByType("Casual")}
              </span>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span>Personal</span>
              <span className="menu-dots">⋮</span>
            </div>
            <div className="card-content">
              <img
                src={personalIcon}
                alt="Personal Icon"
                className="card-icon lock"
              />
              <span className="card-value">
                {getLeaveCountByType("Personal")}
              </span>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span>Sick</span>
              <span className="menu-dots">⋮</span>
            </div>
            <div className="card-content">
              <img
                src={sickIcon}
                alt="Sick Icon"
                className="card-icon medical"
              />
              <span className="card-value">{getLeaveCountByType("Sick")}</span>
            </div>
          </div>
        </div>

        <div className="latest-leaves">
          <div className="latest-leaves-header">
            <h2>Latest Leaves</h2>
          </div>
          <table className="leaves-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const checkboxes =
                        document.querySelectorAll(".row-checkbox");
                      checkboxes.forEach(
                        (checkbox) => (checkbox.checked = e.target.checked)
                      );
                    }}
                  />
                </th>
                <th>Submission Date</th>
                <th>From - To</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((leave, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" className="row-checkbox" />
                  </td>
                  <td>{new Date().toLocaleString()}</td>
                  <td>
                    {leave.fromDate} to {leave.toDate}
                  </td>
                  <td className="leave-type">
                    {getIcon(leave.type)} {leave.type}
                  </td>
                  <td>
                    <span className="status pending">{leave.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar moved to the right */}
      <div className="sidebar">
        <div className="profile-section">
          <User className="profile-picture" />
          <Search className="search-icon" /> {/* Moved search icon here */}
          <h3>Farouk Abichou</h3>
          <p>Software Developer</p>
          <div className="profile-actions">
            <button className="settings-btn">Settings</button>
            <button className="view-profile-btn">View profile</button>
          </div>
        </div>
        <div className="balance-section">
          <div>
            <h3>Balance</h3>
            <div className="balance-value">{leaveData.length}</div>
          </div>
          <div>
            <div className="balance-icon">
              <Scale />
            </div>
          </div>
        </div>
        <button className="apply-btn" onClick={openModal}>
          Apply for leave
        </button>
      </div>
      <Modal
        title="Apply For Leave"
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <div className="input-container">
          <label>Leave Date</label>
          <RangePicker />
        </div>
        <div className="input-container">
          <label>Type</label>
          <Select
            showSearch
            placeholder="Select a leave type"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </div>
        <div className="footer-container">
          <Button>Cancel</Button>
          <Button type="primary">Apply For Leave</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;

// {isModalOpen && (
//   <div className="modal-overlay">
//     <div className="modal">
//       <h2>Apply For Leave</h2>
//       <div className="form-group">
//         <label>Leave Date</label>
//         <div className="date-range">
//           <RangePicker />
//           {/* <input
//             type="date"
//             name="fromDate"
//             value={formData.fromDate}
//             onChange={handleInputChange}
//           />
//           <span>to</span>
//           <input
//             type="date"
//             name="toDate"
//             value={formData.toDate}
//             onChange={handleInputChange}
//           /> */}
//         </div>
//         <p className="hint-text">
//           Select the start and end dates for your leave.
//         </p>
//       </div>
//       <div className="form-group">
//         <label>Type</label>
//         <select
//           name="type"
//           value={formData.type}
//           onChange={handleInputChange}
//         >
//           <option value="">Select...</option>
//           <option>Vacation</option>
//           <option>Casual</option>
//           <option>Personal</option>
//           <option>Sick</option>
//         </select>
//         <p className="hint-text">Select the type of leave.</p>
//       </div>
//       <div className="form-group">
//         <label>Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           placeholder="Type..."
//         ></textarea>
//       </div>
//       <div className="modal-actions">
//         <button className="cancel-btn" onClick={closeModal}>
//           Cancel
//         </button>
//         <button className="apply-btn" onClick={handleSubmit}>
//           Apply For Leave
//         </button>
//       </div>
//     </div>
//   </div>
// )}

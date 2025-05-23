import React, { useState, useEffect } from "react";
import {
  Sun,
  AlertCircle,
  Lock,
  User,
  Settings as SettingsIcon,
  Scale,
  Trash2,
  Edit2,
} from "lucide-react";
import "./Home.css";
import image from "../../../assets/image.png";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import { DatePicker, Modal, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import supabase from '../../../supabase/supabaseClient';

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    type: "",
    description: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);

  const { RangePicker } = DatePicker;

  // 🔄 Fetch depuis Supabase
  const fetchLeaveRequests = async () => {
    const { data, error } = await supabase
      .from("leaverequest")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lors du fetch des leaves:", error.message);
    } else {
      const formattedData = data.map((item) => ({
        fromDate: item.from_date,
        toDate: item.to_date,
        type: item.type,
        status: item.status,
        description: item.description,
      }));
      setLeaveData(formattedData);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ fromDate: "", toDate: "", type: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (formData.fromDate && formData.toDate && formData.type) {
      try {
        const { data, error } = await supabase
          .from("leaverequest")
          .insert([
            {
              from_date: formData.fromDate,
              to_date: formData.toDate,
              type: formData.type,
              description: formData.description,
              status: "Pending",
            },
          ]);

        if (error) {
          console.error("Error inserting data:", error.message);
          alert("Failed to submit leave request.");
        } else {
          alert("Leave request submitted successfully!");
          await fetchLeaveRequests(); // 🔁 Rafraîchir après insert
          closeModal();
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred.");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleDelete = () => {
    setLeaveData((prev) => prev.filter((_, index) => !selectedRows.includes(index)));
    setSelectedRows([]);
  };

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const handleEdit = (index) => {
    const leaveToEdit = leaveData[index];
    setFormData({
      fromDate: leaveToEdit.fromDate,
      toDate: leaveToEdit.toDate,
      type: leaveToEdit.type,
      description: leaveToEdit.description || "",
    });
    setIsModalOpen(true);
    setMenuVisible(null);
  };

  const handleDeleteRow = (index) => {
    setLeaveData((prev) => prev.filter((_, i) => i !== index));
    setMenuVisible(null);
  };

  const getIcon = (type) => {
    switch (type) {
      case "Vacation":
        return <img src={image3} alt="Vacation Icon" className="card-icon sun" />;
      case "Casual":
        return <img src={image2} alt="Casual Icon" className="card-icon alert" />;
      case "Personal":
        return <img src={image1} alt="Personal Icon" className="card-icon lock" />;
      case "Sick":
        return <img src={image} alt="Sick Icon" className="card-icon medical" />;
      default:
        return null;
    }
  };

  const getLeaveCountByType = (type) => {
    return leaveData.filter((leave) => leave.type === type).length;
  };

  const goToSettings = () => {
    navigate("/sidebar/settings");
  };

  const goToViewMore = (key) => {
    navigate(`/view-more/${key}`);
  };

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="page-title-container">
          <h1 className="page-title">Home</h1>
        </div>

        <div className="leave-balance-cards">
          {["Vacation", "Casual", "Personal", "Sick"].map((type) => (
            <div className="card" key={type}>
              <div className="card-header">
                <span>{type}</span>
              </div>
              <div className="card-content">
                {getIcon(type)}
                <span className="card-value">{getLeaveCountByType(type)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="latest-leaves">
          {selectedRows.length > 0 ? (
            <div className="selection-bar">
              <span>{selectedRows.length} selected</span>
              <Trash2 className="delete-icon" onClick={handleDelete} />
            </div>
          ) : (
            <div className="latest-leaves-header">
              <h2>Latest Leaves</h2>
            </div>
          )}
          <table className="leaves-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setSelectedRows(isChecked ? leaveData.map((_, index) => index) : []);
                    }}
                    checked={selectedRows.length === leaveData.length}
                  />
                </th>
                <th>Submission Date</th>
                <th>From - To</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((leave, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      className="row-checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      checked={selectedRows.includes(index)}
                    />
                  </td>
                  <td>{new Date().toLocaleString()}</td>
                  <td>{leave.fromDate} to {leave.toDate}</td>
                  <td className="leave-type">{getIcon(leave.type)} {leave.type}</td>
                  <td>
                    <span
                      className={`status ${
                        leave.status === "Approved"
                          ? "approved"
                          : leave.status === "Rejected"
                          ? "rejected"
                          : "pending"
                      }`}
                      style={{
                        color:
                          leave.status === "Approved"
                            ? "green"
                            : leave.status === "Rejected"
                            ? "red"
                            : "inherit",
                      }}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions-menu">
                      <span className="menu-dots" onClick={() => toggleMenu(index)} style={{ cursor: "pointer", marginLeft: "10px" }}>
                        ⋮
                      </span>
                      {menuVisible === index && (
                        <div className="menu-options">
                          <button onClick={() => handleEdit(index)} className="menu-option">
                            <Edit2 className="icon edit-icon" style={{ color: "#34d399", fontSize: "20px" }} /> Edit
                          </button>
                          <button onClick={() => handleDeleteRow(index)} className="menu-option">
                            <Trash2 className="icon delete-icon" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar" style={{ marginLeft: "20px" }}>
        <div className="profile-section">
          <User className="profile-picture" />
          <h3>Farouk Abichou</h3>
          <p>Software Developer</p>
          <div className="profile-actions">
            <button className="settings-btn" onClick={goToSettings}>Settings</button>
            <button className="view-profile-btn" onClick={() => goToViewMore("example-key")}>View profile</button>
          </div>
        </div>
        <div className="balance-section">
          <div>
            <h3>Balance</h3>
            <div className="balance-value">{leaveData.length}</div>
          </div>
          <div>
            <div className="balance-icon"><Scale /></div>
          </div>
        </div>
        <button className="apply-btn" onClick={openModal}>Apply for leave</button>
      </div>

      {/* Modal pour leave */}
      <Modal
        title="Apply For Leave"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <div className="input-container">
          <label>Leave Date</label>
          <RangePicker
            onChange={(dates, dateStrings) =>
              setFormData({ ...formData, fromDate: dateStrings[0], toDate: dateStrings[1] })
            }
          />
        </div>
        <div className="input-container">
          <label>Type</label>
          <Select
            showSearch
            placeholder="Select a leave type"
            optionFilterProp="label"
            onChange={(value) => setFormData({ ...formData, type: value })}
            options={[
              { value: "Vacation", label: "Vacation" },
              { value: "Casual", label: "Casual" },
              { value: "Personal", label: "Personal" },
              { value: "Sick", label: "Sick" },
            ]}
          />
        </div>
        <div className="input-container">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Type..."
            value={formData.description}
            onChange={handleInputChange}
            style={{ width: "100%", height: "80px", resize: "none" }}
          />
        </div>
        <div className="footer-container">
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!formData.fromDate || !formData.toDate || !formData.type}
          >
            Apply For Leave
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye as Eye, FaCheck as Check, FaTimes as X, FaTrashAlt as Trash2 } from "react-icons/fa"; // Import icons
import "./ReadJobs.css"; // Import CSS for styling

function ReadJobs() {
  const [activeSection, setActiveSection] = useState("about");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0); // New state to track the count of selected checkboxes
  const [data, setData] = useState([
    ...Array.from({ length: 100 }, (_, i) => ({
      key: i + 1,
      name: `User ${i + 1}`,
      role: "Product Designer",
      email: `user${i + 1}@example.com`,
      phoneNumber: `+216 24 800 ${String(353 + i).padStart(3, "0")}`,
      submissionDate: `02/${(i % 28) + 1}/2025 ${String(i % 24).padStart(2, "0")}:00`,
      status: "Pending", // Replace all statuses with "Pending"
      isChecked: false,
    })),
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const allRecords = data; // Replace with actual data source

  const toggleSelectAll = (checked) => {
    setSelectAll(checked);
    setData((prevData) => {
      const updatedData = prevData.map((item) => ({ ...item, isChecked: checked }));
      setSelectedCount(checked ? updatedData.length : 0); // Update selectedCount
      return updatedData;
    });
  };

  const toggleCheckbox = (key) => {
    setData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.key === key ? { ...item, isChecked: !item.isChecked } : item
      );
      setSelectedCount(updatedData.filter((item) => item.isChecked).length); // Update selectedCount
      return updatedData;
    });
  };

  const handleViewMore = (key) => {
    navigate(`/view-more/${key}`); // Navigate to the view-more page with the key as a parameter
  };

  const openApproveModal = (key) => {
    console.log("Open approve modal for key:", key);
    setShowApproveModal(key); // Pass the key of the selected row
  };

  const closeApproveModal = () => {
    setShowApproveModal(false);
  };

  const confirmApprove = (key) => {
    console.log("Confirm approve for key:", key);
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: "Approved" } : item
      )
    );
    setShowApproveModal(false);
  };

  const openRejectModal = (key) => {
    console.log("Open reject modal for key:", key);
    setShowRejectModal(key); // Pass the key of the selected row
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
  };

  const confirmReject = (key) => {
    console.log("Confirm reject for key:", key);
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: "Rejected" } : item
      )
    );
    setShowRejectModal(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    console.log("Confirm delete");
    setShowDeleteModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(allRecords.length / rowsPerPage);
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pageNumbers.map((page, index) => (
      <button
        key={index}
        className={`btn page-btn ${page === currentPage ? "active" : ""}`}
        onClick={() => typeof page === "number" && handlePageChange(page)}
        disabled={page === "..."}
      >
        {page}
      </button>
    ));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow); // Use `data` for pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="read-jobs-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Go Back
      </button>
      <div className="header-section">
        <div className="job-icon"></div>
        <div className="job-title">
          <h1>Ui/Ux design</h1>
        </div>
        <button className="view-portfolio-btn">+ View submissions </button>
      </div>

      <div className="tabs-section">
        <button
          className={`tab-button ${activeSection === "about" ? "active-tab" : ""}`}
          onClick={() => setActiveSection("about")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#6941C6",
            backgroundColor: activeSection === "about" ? "#F9F5FF" : "transparent",
            border: activeSection === "about" ? "1px solid #6941C6" : "1px solid transparent",
            borderRadius: "8px",
            padding: "8px 12px",
            width: "84px",
            height: "48px",
            cursor: "pointer",
          }}
        >
          <span>Job</span>
          <span>brief</span>
        </button>
        <button
          className={`tab-button ${activeSection === "members" ? "active-tab" : ""}`}
          onClick={() => setActiveSection("members")}
          style={{
            width: "84px",
            height: "36px",
            borderRadius: "6px",
            padding: "8px 12px",
            backgroundColor: activeSection === "members" ? "#F9F5FF" : "transparent",
            color: activeSection === "members" ? "#6B46C1" : "#6B46C1",
            fontWeight: activeSection === "members" ? "bold" : "normal",
          }}
        >
          Members
        </button>
        <button
          className="tab-button"
          style={{
            width: "84px",
            height: "36px",
            borderRadius: "6px",
            padding: "8px 12px",
            backgroundColor: "transparent",
            color: "#6B46C1",
          }}
        >
          Dummy
        </button>
      </div>
      {activeSection === "about" && (
        <div className="about-section">
          <h2>Job overview</h2>
          <p>A short summary of the job (truncated if too long).</p>
          <div className="job-overview">
            <p>
              Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere.
            </p>
          </div>
          <h2>About the Job</h2>
          <p>
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla. Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus.
          </p>
          <ul>
            <li>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.</li>
            <li>Non pellentesque congue eget consectetur turpis.</li>
            <li>Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus.</li>
          </ul>
        </div>
      )}
      {activeSection === "members" && (
        <div className="members-section">
          {selectedCount > 0 && ( // Show green bar if any checkbox is selected
            <div
              className="green-bar"
              style={{
                display: "flex", // Add flexbox for alignment
                justifyContent: "space-between", // Space between text and icon
                alignItems: "center", // Center items vertically
                backgroundColor: "#D1FADF", // Green background
                color: "#027A48", // Green text
                padding: "16px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "24px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <span>
                {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
              </span>
              <button
                className="delete-icon-btn"
                onClick={openDeleteModal} // Open delete modal
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#027A48",
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
          <table className="registrations-table">
            {!selectedCount && ( // Show "Latest Registrations" header if no checkbox is selected
              <thead>
                <tr>
                  <th colSpan="7" className="table-header-title" style={{
                    backgroundColor: "#FFFFFF", // Base/White
                    borderBottom: "1px solid #E0E0E0", // Accent line (if needed)
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "600",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#101828",
                    textAlign: "left",
                    padding: "16px",
                  }}>
                    Latest Registrations
                  </th>
                </tr>
              </thead>
            )}
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item) => (
                  <tr key={item.key}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.isChecked || false}
                        onChange={() => toggleCheckbox(item.key)}
                      />
                    </td>
                    <td className="name-cell">
                      <div className="avatar"></div>
                      <div>
                        <p>{item.name}</p>
                        <p className="role">{item.role}</p>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.submissionDate}</td>
                    <td className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </td>
                    <td className="actions">
                      <div className="action-buttons">
                        <button className="action-btn view-btn" onClick={() => handleViewMore(item.key)}>
                          <Eye size={16} />
                        </button>
                        <button className="action-btn approve-btn" onClick={() => openApproveModal(item.key)}>
                          <Check size={16} />
                        </button>
                        <button className="action-btn reject-btn" onClick={() => openRejectModal(item.key)}>
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal">
                <Trash2 size={24} className="modal-icon" />
                <h2>Are you sure you want to delete?</h2>
                <p>This action cannot be undone.</p>
                <div className="modal-actions">
                  <button className="btn cancel-btn" onClick={closeDeleteModal}>
                    Cancel
                  </button>
                  <button className="btn delete-btn" onClick={confirmDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          {showApproveModal && (
            <div className="modal-overlay">
              <div className="modal">
                <Check size={24} className="modal-icon-approve" />
                <h2>Are you sure you want to Approve?</h2>
                <p>This action will approve the selected request.</p>
                <div className="modal-actions">
                  <button className="btn cancel-btn" onClick={closeApproveModal}>
                    Cancel
                  </button>
                  <button
                    className="btn approve-btn"
                    onClick={() => confirmApprove(showApproveModal)} // Pass the key
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          )}
          {showRejectModal && (
            <div className="modal-overlay">
              <div className="modal">
                <X size={24} className="modal-icon-reject" />
                <h2>Are you sure you want to Reject?</h2>
                <p>This action will reject the selected request.</p>
                <div className="modal-actions">
                  <button className="btn cancel-btn" onClick={closeRejectModal}>
                    Cancel
                  </button>
                  <button
                    className="btn reject-btn"
                    onClick={() => confirmReject(showRejectModal)} // Pass the key
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}
          <footer className="registrations-footer">
            <button
              className="btn pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <div className="page-numbers">
              {renderPageNumbers()}
            </div>
            <button
              className="btn pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(allRecords.length / rowsPerPage)}
            >
              Next →
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

export default ReadJobs;
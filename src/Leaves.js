import React, { useState, useEffect } from "react";
import { Search, CloudDownload, Check, X, Trash2 } from "lucide-react"; // Import Trash2 icon
import "./Leaves.css";

const Leaves = () => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change the number of items per page to 5
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [showDeleteBar, setShowDeleteBar] = useState(false); // New state for delete bar
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [showApproveDialog, setShowApproveDialog] = useState(false); // New state for approve dialog
  const [rowToApprove, setRowToApprove] = useState(null); // Track the row to approve
  const [showRejectDialog, setShowRejectDialog] = useState(false); // New state for reject dialog
  const [rowToReject, setRowToReject] = useState(null); // Track the row to reject

  useEffect(() => {
    const updateDataFromLocalStorage = () => {
      const savedLeaves = JSON.parse(localStorage.getItem("leaveData")) || [];
      const formattedLeaves = savedLeaves.map((leave, index) => ({
        key: index + 1,
        name: leave.name || "New User",
        role: leave.role || "Employee",
        leaveType: leave.type,
        startDate: leave.fromDate,
        endDate: leave.toDate,
        duration: `${Math.ceil(
          (new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 3600 * 24)
        )} days`,
        status: leave.status || "Pending",
      }));
      setData(formattedLeaves);
    };

    // Initial load
    updateDataFromLocalStorage();

    // Listen for changes in localStorage
    window.addEventListener("storage", updateDataFromLocalStorage);

    return () => {
      window.removeEventListener("storage", updateDataFromLocalStorage);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setData(filteredData);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    const updatedData = data.map((item) => {
      item.isChecked = isChecked;
      return item;
    });
    setData([...updatedData]);
    setShowDeleteBar(isChecked); // Show delete bar if all are selected
    setSelectedRows(isChecked ? updatedData.map((item) => item.key) : []);
  };

  const toggleCheckbox = (key) => {
    const updatedData = data.map((item) => {
      if (item.key === key) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setData([...updatedData]);
    const selected = updatedData.filter((item) => item.isChecked).map((item) => item.key);
    setSelectedRows(selected);
    setShowDeleteBar(selected.length > 0); // Show delete bar if any checkbox is selected
  };

  const confirmDelete = (key) => {
    setRowToDelete(key);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((item) => item.key !== rowToDelete));
    setShowDeleteDialog(false);
    setRowToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setRowToDelete(null);
  };

  const confirmApprove = (key) => {
    setRowToApprove(key);
    setShowApproveDialog(true);
  };

  const handleApprove = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === rowToApprove ? { ...item, status: "Approved" } : item
      )
    );
    setShowApproveDialog(false);
    setRowToApprove(null);
  };

  const cancelApprove = () => {
    setShowApproveDialog(false);
    setRowToApprove(null);
  };

  const confirmReject = (key) => {
    setRowToReject(key);
    setShowRejectDialog(true);
  };

  const cancelReject = () => {
    setShowRejectDialog(false);
    setRowToReject(null);
  };

  const handleRejectConfirm = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === rowToReject ? { ...item, status: "Rejected" } : item
      )
    );
    setShowRejectDialog(false);
    setRowToReject(null);
  };

  const handleReject = (key) => {
    confirmReject(key);
  };

  const handleDeleteSelected = () => {
    setData((prevData) => prevData.filter((item) => !selectedRows.includes(item.key)));
    setShowDeleteBar(false);
    setSelectedRows([]);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="leaves-container">
      <header className="leaves-header">
        <h1>Home</h1>
      </header>

      <h2 className="leaves-latest">Latest Leaves Request</h2>

      <p className="leaves-description">Keep Lorem IpsumLorem IpsumLorem Ipsum Lorem</p>
      <div className="search-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="   Search"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            style={{ textIndent: "10px", width: "200px" }}
          />
        </div>
      </div>

      <div className="table-container full-width">
        {showDeleteBar ? (
          <div className="delete-bar">
            <span>{selectedRows.length} selected</span>
            <button className="delete-icon-button" onClick={handleDeleteSelected}>
              <Trash2 className="delete-icon" size={20} />
            </button>
          </div>
        ) : (
          <h3 className="table-header-title">Latest Registration</h3>
        )}
        <div className="table-scroll">
          <table className="styled-table">
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
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.key} className="table-row">
                    <td>
                      <input
                        type="checkbox"
                        checked={item.isChecked || false}
                        onChange={() => toggleCheckbox(item.key)}
                      />
                    </td>
                    <td className="user-info">
                      <div className="avatar"></div>
                      <div>
                        <p className="user-name">{item.name}</p>
                        <p className="user-role">{item.role}</p>
                       
                      </div>
                    </td>
                   
                  <td className="leave-type"> {item.leaveType}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.duration}</td>
                    <td
                      className={
                        item.status === "Pending"
                          ? "status-pending"
                          : item.status === "Approved"
                          ? "status-approved"
                          : "status-rejected"
                      }
                    >
                      {item.status}
                    </td>
                    <td className="actions">
                      <button className="action-approve" onClick={() => confirmApprove(item.key)}>
                        <Check size={16} />
                      </button>
                      <button className="action-reject" onClick={() => handleReject(item.key)}>
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No data available.
                  </td>
                </tr>
              )}
           
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="delete-dialog-overlay">
          <div className="delete-dialog">
            <div className="dialog-header">
              <div className="dialog-icon"><X size={20} /></div>
              <h2>Are you sure?</h2>
            </div>
            <p className="dialog-text">Are you sure you want to delete this row? This action cannot be undone.</p>
            <div className="dialog-actions">
              <button className="cancel-button" onClick={cancelDelete}>Cancel</button>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showApproveDialog && (
        <div className="approve-dialog-overlay">
          <div className="approve-dialog">
            <div className="dialog-header">
              <div className="dialog-icon">
                <Check size={20} style={{ color: "green" }} />
              </div>
              <h2>Are you sure you want to Approve?</h2>
            </div>
            <p className="dialog-text">This action will approve the selected request.</p>
            <div className="dialog-actions">
              <button className="cancel-button" onClick={cancelApprove}>
                Cancel
              </button>
              <button className="approve-button" onClick={handleApprove}>
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectDialog && (
        <div className="reject-dialog-overlay">
          <div className="reject-dialog">
            <div className="dialog-header">
              <div className="dialog-icon">
                <X size={20} style={{ color: "red" }} />
              </div>
              <h2>Are you sure you want to Reject?</h2>
            </div>
            <p className="dialog-text">This action will reject the selected request.</p>
            <div className="dialog-actions">
              <button className="cancel-button" onClick={cancelReject}>
                Cancel
              </button>
              <button className="reject-button" onClick={handleRejectConfirm}>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          ← Previous
        </button>
        <div className="pagination-pages">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`page-button ${page === currentPage ? "active" : ""}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          className="pagination-button"
        >
          Next →
        </button>
      </footer>
    </div>
  );
};

export default Leaves;
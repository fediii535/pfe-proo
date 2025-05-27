import React, { useState, useEffect } from "react";
import { Search, Check, X, Trash2 } from "lucide-react";
import "./Leaves.css";
import supabase from '../../../supabase/supabaseClient';
import { Input, Space } from 'antd';
import accept from '../../../assets/accept.png'
import reject from '../../../assets/reject.png'

const Leaves = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [showDeleteBar, setShowDeleteBar] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [rowToApprove, setRowToApprove] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rowToReject, setRowToReject] = useState(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const { data: leaveData, error } = await supabase
          .from("leaverequest")
          .select("*");

        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          const formattedLeaves = leaveData.map((leave, index) => ({
            key: index + 1,
            id: leave.id, // <-- UUID réel ici
            name: leave.name || "New User",
            role: leave.role || "Employee",
            leaveType: leave.type,
            startDate: leave.from_date,
            endDate: leave.to_date,
            duration: `${Math.ceil(
              (new Date(leave.to_date) - new Date(leave.from_date)) /
                (1000 * 3600 * 24)
            )} days`,
            status: leave.status || "Pending",
            isChecked: false,
          }));
          setData(formattedLeaves);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchLeaveData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    // Pour éviter de filtrer directement data qui modifie l’état, on pourrait faire un filtre temporaire
    // mais ici on va juste faire simple (optionnel: gérer un filteredData séparé)
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    const updatedData = data.map((item) => ({
      ...item,
      isChecked: isChecked,
    }));
    setData(updatedData);
    setShowDeleteBar(isChecked);
    setSelectedRows(isChecked ? updatedData.map((item) => item.key) : []);
  };

  const toggleCheckbox = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, isChecked: !item.isChecked } : item
    );
    setData(updatedData);
    const selected = updatedData
      .filter((item) => item.isChecked)
      .map((item) => item.key);
    setSelectedRows(selected);
    setShowDeleteBar(selected.length > 0);
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

  const confirmApprove = (id) => {
    setRowToApprove(id);
    setShowApproveDialog(true);
  };

  const handleApprove = async () => {
    try {
      const { error } = await supabase
        .from("leaverequest")
        .update({ status: "Approved" })
        .eq("id", rowToApprove);

      if (error) {
        console.error("Error updating status:", error.message);
        alert("Failed to approve the request.");
      } else {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === rowToApprove ? { ...item, status: "Approved" } : item
          )
        );
        alert("Request approved successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setShowApproveDialog(false);
      setRowToApprove(null);
    }
  };

  const cancelApprove = () => {
    setShowApproveDialog(false);
    setRowToApprove(null);
  };

  const confirmReject = (id) => {
    setRowToReject(id);
    setShowRejectDialog(true);
  };

  const cancelReject = () => {
    setShowRejectDialog(false);
    setRowToReject(null);
  };

  const handleRejectConfirm = async () => {
    try {
      const { error } = await supabase
        .from("leaverequest")
        .update({ status: "Rejected" })
        .eq("id", rowToReject);

      if (error) {
        console.error("Error updating status:", error.message);
        alert("Failed to reject the request.");
      } else {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === rowToReject ? { ...item, status: "Rejected" } : item
          )
        );
        alert("Request rejected successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setShowRejectDialog(false);
      setRowToReject(null);
    }
  };

  const handleReject = (id) => {
    confirmReject(id);
  };

  const handleDeleteSelected = () => {
    setData((prevData) =>
      prevData.filter((item) => !selectedRows.includes(item.key))
    );
    setShowDeleteBar(false);
    setSelectedRows([]);
  };

  // Pagination & filtering (simple filtering by name)
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const { Search } = Input;

  return (
    <div className="leaves-container">
      <header className="leaves-header">
        <h1>Leaves</h1>
      </header>
      <Search placeholder="input search text" onSearch={''} style={{ width: 200 }} />

  
      <div className="search-container">
        <div className="search-input-wrapper">
          {/* <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="   Search"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            style={{ textIndent: "10px", width: "200px" }}
          /> */}
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
          <h3 className="table-header-title">Latest Leaves</h3>
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
                    <td className="leave-type">{item.leaveType}</td>
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

                    <img src={reject}  onClick={() => confirmApprove(item.id)}/>

                    <img src={accept} onClick={() => handleReject(item.id)}/>
                      {/* <button
                        className="action-approve"
                        onClick={() => confirmApprove(item.id)}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        className="action-reject"
                        onClick={() => handleReject(item.id)}
                      >
                        <X size={16} />
                      </button> */}
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
              <div className="dialog-icon">
                <X size={20} />
              </div>
              <h2>Are you sure?</h2>
            </div>
            <p className="dialog-text">
              Are you sure you want to delete this row? This action cannot be
              undone.
            </p>
            <div className="dialog-buttons">
              <button onClick={cancelDelete} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showApproveDialog && (
        <div className="approve-dialog-overlay">
          <div className="approve-dialog">
            <div className="dialog-header">
              <div className="dialog-icon">
                <Check size={20} />
              </div>
              <h2>Confirm Approval</h2>
            </div>
            <p className="dialog-text">Are you sure you want to approve this leave request?</p>
            <div className="dialog-buttons">
              <button onClick={cancelApprove} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleApprove} className="approve-button">
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
                <X size={20} />
              </div>
              <h2>Confirm Rejection</h2>
            </div>
            <p className="dialog-text">Are you sure you want to reject this leave request?</p>
            <div className="dialog-buttons">
              <button onClick={cancelReject} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleRejectConfirm} className="reject-button">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;

import React, { useState } from "react";
import { Search, CloudDownload, Check, X, Eye, Funnel, Settings, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Registrations.css";

const Registrations = () => {
  const allData = Array.from({ length: 100 }, (_, index) => ({
    key: index + 1,
    name: `User ${index + 1}`,
    role: "Product Designer",
    email: "Farouk@gmail.com",
    phoneNumber: `+123456789${index}`,
    submissionDate: `02/23/2025 ${String(index % 24).padStart(2, "0")}:${String(index % 60).padStart(2, "0")}`,
    duration: "4 days",
    status: "Pending", // par défaut tous en Pending
  }));

  const [allRecords, setAllRecords] = useState(allData);
  const [data, setData] = useState(allData.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [showSearchButtons, setShowSearchButtons] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedRowForStatus, setSelectedRowForStatus] = useState(null);
  const [showGreenBar, setShowGreenBar] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedRowForApprove, setSelectedRowForApprove] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRowForReject, setSelectedRowForReject] = useState(null);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = allRecords.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setData(filteredData.slice(0, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * 10;
    const filteredData = allRecords.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setData(filteredData.slice(startIndex, startIndex + 10));
    setCurrentPage(page);
  };

  const toggleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    const updated = allRecords.map((item) => ({
      ...item,
      isChecked: isChecked,
    }));
    setAllRecords(updated);
    const filteredData = updated.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    const startIndex = (currentPage - 1) * 10;
    setData(filteredData.slice(startIndex, startIndex + 10));
    setShowGreenBar(isChecked);
    setSelectedCount(isChecked ? updated.length : 0);
  };

  const toggleCheckbox = (key) => {
    const updated = allRecords.map((item) =>
      item.key === key ? { ...item, isChecked: !item.isChecked } : item
    );
    setAllRecords(updated);
    const filteredData = updated.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    const startIndex = (currentPage - 1) * 10;
    setData(filteredData.slice(startIndex, startIndex + 10));
    const selectedItems = updated.filter((item) => item.isChecked);
    setShowGreenBar(selectedItems.length > 0);
    setSelectedCount(selectedItems.length);
  };

  const openDeleteModal = (key) => {
    setSelectedRow(key);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = allRecords.filter((item) => item.key !== selectedRow);
    setAllRecords(updated);
    const filteredData = updated.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    const startIndex = (currentPage - 1) * 10;
    setData(filteredData.slice(startIndex, startIndex + 10));
    setShowDeleteModal(false);
    setSelectedRow(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedRow(null);
  };

  const openStatusModal = (key) => {
    setSelectedRowForStatus(key);
    setShowStatusModal(true);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setSelectedRowForStatus(null);
  };

  const updateStatus = (status) => {
    const updated = allRecords.map((item) =>
      item.key === selectedRowForStatus ? { ...item, status } : item
    );
    setAllRecords(updated);
    const filteredData = updated.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    const startIndex = (currentPage - 1) * 10;
    setData(filteredData.slice(startIndex, startIndex + 10));
    closeStatusModal();
  };

  const openApproveModal = (key) => {
    setSelectedRowForApprove(key);
    setShowApproveModal(true);
  };

  const closeApproveModal = () => {
    setShowApproveModal(false);
    setSelectedRowForApprove(null);
  };

  const confirmApprove = () => {
    const updated = allRecords.map((item) =>
      item.key === selectedRowForApprove ? { ...item, status: "Approved" } : item
    );
    setAllRecords(updated);
    const filteredData = updated.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    const startIndex = (currentPage - 1) * 10;
    setData(filteredData.slice(startIndex, startIndex + 10));
    closeApproveModal();
  };

  const openRejectModal = (key) => {
    setSelectedRowForReject(key);
    setShowRejectModal(true);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setSelectedRowForReject(null);
  };

  const confirmReject = () => {
    const updated = allRecords.map((item) =>
      item.key === selectedRowForReject ? { ...item, status: "Rejected" } : item
    );
    setAllRecords(updated);
    const filteredData = updated.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    const startIndex = (currentPage - 1) * 10;
    setData(filteredData.slice(startIndex, startIndex + 10));
    closeRejectModal();
  };

  const handleViewMore = (key) => {
    navigate(`/vue-more/${key}`);
  };

  const toggleSearchButtons = () => {
    setShowSearchButtons((prev) => !prev);
  };

  return (
    <div className="registrations-container">
      <header className="registrations-header">
        <h1>Registrations</h1>
        <div className="registrations-actions">
          <Search className="icon-search" size={20} onClick={toggleSearchButtons} />
          <div className={`search-buttons ${showSearchButtons ? "visible" : "hidden"}`}>
            <button className="btn filter-btn"><Funnel size={16} /> Filter</button>
            <button className="btn customize-btn"><Settings size={16} /> Customize</button>
          </div>
        </div>
      </header>

      <div className="registrations-searchbar">
        <div>
          <h3>Latest Registrations</h3>
          <p>Keep track of latest registrations easily</p>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="   Search"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            style={{ textIndent: "10px", width: "200px" }}
          />
          <Search className="input-icon" size={16} />
        </div>
      </div>

      <div className="registrations-table-wrapper" style={{ overflow: "visible", marginLeft: "-10px" }}>
        {showGreenBar ? (
          <div className="green-bar-fullwidth">
            <p>{selectedCount} selected</p>
            <Trash2
              size={20}
              className="green-bar-icon"
              onClick={() => {
                const updated = allRecords.filter((item) => !item.isChecked);
                setAllRecords(updated);
                const filteredData = updated.filter((item) =>
                  item.name.toLowerCase().includes(searchTerm)
                );
                const startIndex = (currentPage - 1) * 10;
                setData(filteredData.slice(startIndex, startIndex + 10));
                setShowGreenBar(false);
                setSelectedCount(0);
              }}
            />
          </div>
        ) : (
          <h2 className="table-title">Latest Registrations</h2>
        )}
        <table className="registrations-table">
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
              <th>Email address</th>
              <th>Phone Number</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
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
                    <button onClick={() => handleViewMore(item.key)}>
                      <Eye size={16} />
                    </button>
                    <button onClick={() => openApproveModal(item.key)}>
                      <Check size={16} />
                    </button>
                    <button onClick={() => openRejectModal(item.key)}>
                      <X size={16} />
                    </button>
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
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <Trash2 size={24} className="modal-icon" />
            <h2>Are you sure you want to delete?</h2>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={closeDeleteModal}>Cancel</button>
              <button className="btn delete-btn" onClick={confirmDelete}>Delete</button>
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
              <button className="btn cancel-btn" onClick={closeApproveModal}>Cancel</button>
              <button className="btn approve-btn" onClick={confirmApprove}>Approve</button>
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
              <button className="btn cancel-btn" onClick={closeRejectModal}>Cancel</button>
              <button className="btn reject-btn" onClick={confirmReject}>Reject</button>
            </div>
          </div>
        </div>
      )}

      <footer className="registrations-footer">
        <button className="btn pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>← Previous</button>
        <div className="page-numbers">
          {Array.from({ length: Math.ceil(allRecords.length / 10) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`btn page-btn ${page === currentPage ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="btn pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(allRecords.length / 10)}>Next →</button>
      </footer>
    </div>
  );
};

export default Registrations;

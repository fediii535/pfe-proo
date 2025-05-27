import React, { useState } from "react";
import {
  Search,
  CloudDownload,
  Check,
  X,
  Trash2,
} from "lucide-react";
import "./Registrations.css"; // Import CSS
import { Input, Space } from 'antd';
import reject from '../../../assets/reject.png'
import accept from '../../../assets/accept.png'

const Registrations = () => {
  const allData = Array.from({ length: 100 }, (_, index) => ({
    key: index + 1,
    name: `User ${index + 1}`,
    role: "Product Designer",
    email: "Farouk@gmail.com",
    phoneNumber: `+123456789${index}`,
    submissionDate: `02/23/2025 ${String(index % 24).padStart(2, "0")}:${String(index % 60).padStart(2, "0")}`,
    duration: "4 days",
    status: index % 2 === 0 ? "Pending" : "Approved",
  }));

  const [data, setData] = useState(allData.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedRowForStatus, setSelectedRowForStatus] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = allData.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setData(filteredData.slice(0, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * 10;
    const filteredData = allData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setData(filteredData.slice(startIndex, startIndex + 10));
    setCurrentPage(page);
  };

  const toggleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    allData.forEach((item) => (item.isChecked = isChecked));
    setData(allData.slice((currentPage - 1) * 10, currentPage * 10));
  };

  const toggleCheckbox = (key) => {
    allData.forEach((item) => {
      if (item.key === key) {
        item.isChecked = !item.isChecked;
      }
    });
    setData(allData.slice((currentPage - 1) * 10, currentPage * 10));
  };

  const deleteRow = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const openDeleteModal = (key) => {
    setSelectedRow(key);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setData((prevData) => prevData.filter((item) => item.key !== selectedRow));
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
    setData((prevData) =>
      prevData.map((item) =>
        item.key === selectedRowForStatus ? { ...item, status } : item
      )
    );
    closeStatusModal();
  };
  const { Search } = Input;
  return (
    <div className="registrations-container">
      <header className="header">
        <h1>Registrations</h1>
        <button className="export-btn">
          <CloudDownload size={16} /> Export
        </button>
      </header>

      <div className="search-section">
        <div>
          <h3>Latest Registrations</h3>
        </div>
        <Search placeholder="input search text" onSearch={''} style={{ width: 200 }} />

        {/* <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="search-icon" size={16} />
        </div> */}
      </div>

      <div className="table-container">
        <div className="table-scroll">
          <table>
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
                  <tr
                    key={item.key}
                    className={`${
                      searchTerm && item.name.toLowerCase().includes(searchTerm)
                        ? "highlighted-row"
                        : ""
                    }`}
                  >
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
                
                      <img src={reject} onClick={() => openDeleteModal(item.key)}/>

                      <img src={accept} onClick={() => openStatusModal(item.key)}/>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-message">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div className="icon red">
                <Trash2 size={24} />
              </div>
              <h2>Are you sure you want to Delete?</h2>
            </div>
            <p className="modal-body">
              Deleting this record is irreversible. Please confirm your action.
            </p>
            <div className="modal-actions">
              <button onClick={closeDeleteModal} className="cancel-btn">Cancel</button>
              <button onClick={confirmDelete} className="delete-btn">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Status Modal */}
      {showStatusModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div className="icon red">
                <X size={24} />
              </div>
              <h2>
                Are you sure you want to Accept {data.find(item => item.key === selectedRowForStatus)?.name}'s Leave Request?
              </h2>
            </div>
            <p className="modal-body">
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...
            </p>
            <div className="modal-actions">
              <button onClick={() => updateStatus("Rejected")} className="reject-btn">Reject</button>
              <button onClick={() => updateStatus("Approved")} className="approve-btn">Approve</button>
            </div>
          </div>
        </div>
      )}

      <footer className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <div className="page-numbers">
          {Array.from({ length: Math.ceil(allData.length / 10) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={page === currentPage ? "active-page" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(allData.length / 10)}
        >
          Next →
        </button>
      </footer>
    </div>
  );
};

export default Registrations;

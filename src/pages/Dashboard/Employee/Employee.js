import React, { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileDown
} from "lucide-react";
import "./Employee.css";
import { Input, Space } from 'antd';

const Employee = () => {
  const allDataInit = [
    {
      key: 1,
      name: "Mr. Billy Strosin V",
      role: "Product Designer",
      email: "Farouk@gmail.com",
      phone: "+216 24 800 353",
      hiringDate: "02/19/2025 22:52",
    },
    // Ajoute ici les autres employés de départ
    ...Array.from({ length: 50 }, (_, i) => ({
      key: i + 2,
      name: `Employee ${i + 2}`,
      role: "Product Designer",
      email: "Farouk@gmail.com",
      phone: "+216 24 800 353",
      hiringDate: `03/${(i % 30) + 1}/2025 10:00`,
    })),
  ];

  const [allEmployees, setAllEmployees] = useState(allDataInit);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState(null);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);

  const itemsPerPage = 10;

  const filteredEmployees = allEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    const newSelected = isChecked ? currentEmployees.map(emp => emp.key) : [];
    setSelectedRows(newSelected);
    setSelectedCount(newSelected.length);
  };

  const toggleCheckbox = (key) => {
    const updated = selectedRows.includes(key)
      ? selectedRows.filter((id) => id !== key)
      : [...selectedRows, key];

    setSelectedRows(updated);
    setSelectedCount(updated.length);
    setSelectAll(updated.length === currentEmployees.length);
  };

  const openDeleteModal = (key) => {
    setSelectedEmployeeToDelete(key);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = allEmployees.filter(emp => emp.key !== selectedEmployeeToDelete);
    setAllEmployees(updated);
    setSelectedRows(selectedRows.filter(id => id !== selectedEmployeeToDelete));
    setSelectedCount(prev => prev - 1);
    setShowDeleteModal(false);
    setSelectedEmployeeToDelete(null);
  };

  const deleteSelected = () => {
    const updated = allEmployees.filter(emp => !selectedRows.includes(emp.key));
    setAllEmployees(updated);
    setSelectedRows([]);
    setSelectedCount(0);
    setSelectAll(false);
  };
  const { Search } = Input;

  return (
    <div className="employee-container" style={{marginLeft: "100px"}}>
      <div className="employee-header">
        <h1>Employees</h1>
        <button className="export-btn">
          <FileDown size={16} /> Export
        </button>
      </div>
      <Search placeholder="input search text" onSearch={''} style={{ width: 200 }} />

      {/* <div className="section-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div> */}

      <div className="table-container">
        <h2 className="table-header">Latest Hiring</h2>
        {selectedCount > 0 && (
          <div className="green-bar">
            <span>{selectedCount} selected</span>
            <button onClick={deleteSelected}>
              <Trash2 size={16} />
            </button>
          </div>
        )}
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
              <th>Email</th>
              <th>Phone</th>
              <th>Hiring Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp) => (
              <tr key={emp.key}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(emp.key)}
                    onChange={() => toggleCheckbox(emp.key)}
                  />
                </td>
                <td>
                  <div className="name-cell">
                    <div className="avatar" />
                    <div>
                      <p>{emp.name}</p>
                      <p className="role">{emp.role}</p>
                    </div>
                  </div>
                </td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.hiringDate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="approve-btn">
                      <span>✔</span>
                    </button>
                    <button className="delete-btn">
                      <span>✖</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {currentEmployees.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <div className="page-numbers">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      {selectedEmployeeDetails && (
        <div className="modal">
          <div className="modal-content">
            <h3>Employee Details</h3>
            <p><strong>Name:</strong> {selectedEmployeeDetails.name}</p>
            <p><strong>Role:</strong> {selectedEmployeeDetails.role}</p>
            <p><strong>Email:</strong> {selectedEmployeeDetails.email}</p>
            <p><strong>Phone:</strong> {selectedEmployeeDetails.phone}</p>
            <p><strong>Hiring Date:</strong> {selectedEmployeeDetails.hiringDate}</p>
            <button onClick={() => setSelectedEmployeeDetails(null)}>Close</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;

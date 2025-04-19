import React, { useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight, FaFileExport } from "react-icons/fa";
import "./Leaves.css";

const Leaves = () => {
  const allData = [
    {
      key: 1,
      name: "Mr. Billy Strosin V",
      role: "Product Designer",
      leaveType: "Vacation",
      startDate: "02/10/2025 22:52",
      endDate: "06/10/2025 22:52",
      duration: "4 days",
      status: "Pending"
    },
    {
      key: 2,
      name: "Blake Becker",
      role: "Product Designer",
      leaveType: "Vacation",
      startDate: "02/07/2025 05:03",
      endDate: "06/07/2025 05:03",
      duration: "4 days",
      status: "Pending"
    },
    {
      key: 3,
      name: "Angela Runte",
      role: "Product Designer",
      leaveType: "Vacation",
      startDate: "02/05/2025 05:03",
      endDate: "06/05/2025 05:03",
      duration: "4 days",
      status: "Pending"
    },
    {
      key: 4,
      name: "Jimmie Wolf",
      role: "Product Designer",
      leaveType: "Vacation",
      startDate: "02/06/2025 05:03",
      endDate: "06/06/2025 05:03",
      duration: "4 days",
      status: "Pending"
    },
    {
      key: 5,
      name: "Irma Hane",
      role: "Product Designer",
      leaveType: "Vacation",
      startDate: "02/09/2025 05:03",
      endDate: "06/09/2025 05:03",
      duration: "4 days",
      status: "Pending"
    },
    {
      key: 6,
      name: "DR. Alonzo Hegmann",
      role: "Product Designer",
      leaveType: "Vacation",
      startDate: "02/05/2025 05:03",
      endDate: "06/05/2025 05:03",
      duration: "4 days",
      status: "Pending"
    },
    {
      key: 7,
      name: "Sergio Gislason",
      role: "Product Designer",
      leaveType: "Vacation",
      startDate: "02/04/2025 05:03",
      endDate: "06/04/2025 05:03",
      duration: "4 days",
      status: "Pending"
    },
    // ... autres données comme dans votre exemple
  ];

  const [data, setData] = useState(allData.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);

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
    const updatedData = data.map(item => ({ ...item, isChecked })); 
    setData(updatedData);
  };

  const toggleCheckbox = (key) => {
    const updatedData = data.map(item =>
      item.key === key ? { ...item, isChecked: !item.isChecked } : item
    );
    setData(updatedData);
  };

  const handleApprove = (key) => {
    const updatedData = data.map(item =>
      item.key === key ? { ...item, status: "Approved" } : item
    );
    setData(updatedData);
  };

  const handleReject = (key) => {
    const updatedData = data.filter((item) => item.key !== key);
    setData(updatedData);
  };

  return (
    <div className="leaves-container">
      <header className="leaves-header">
        <h1>Home</h1>
        <div className="header-right">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="export-btn">
            <FaFileExport /> Export
          </button>
        </div>
      </header>

      <div className="section-header">
        <h2 className="leaves-subtitle">Latest Leaves Request</h2>
        <p className="description">Keep Lorem IpsumLorem IpsumLorem Ipsum Lorem</p>
      </div>
      

      <div className="table-container">
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
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <React.Fragment key={item.key}>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.isChecked || false}
                        onChange={() => toggleCheckbox(item.key)}
                      />
                    </td>
                    <td>
                      <div className="name-cell">
                        <div className="avatar"></div>
                        <div>
                          <p>{item.name}</p>
                          <p className="role">{item.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="leave-type">{item.leaveType}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.duration}</td>
                    <td className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </td>
                    <td>
                      <button 
                        className="approve-btn"
                        onClick={() => handleApprove(item.key)}
                      >
                        ✓
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleReject(item.key)}
                      >
                        ✗
                      </button>
                    </td>
                  </tr>
                  <tr className="spacer-row">
                    <td colSpan="8"></td>
                  </tr>
                </React.Fragment>
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

      <footer className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft /> Previous
        </button>
        <div className="page-numbers">
          <button className={currentPage === 1 ? "active" : ""} onClick={() => handlePageChange(1)}>1</button>
          <button className={currentPage === 2 ? "active" : ""} onClick={() => handlePageChange(2)}>2</button>
          <button className={currentPage === 3 ? "active" : ""} onClick={() => handlePageChange(3)}>3</button>
          <span>...</span>
          <button className={currentPage === 8 ? "active" : ""} onClick={() => handlePageChange(8)}>8</button>
          <button className={currentPage === 9 ? "active" : ""} onClick={() => handlePageChange(9)}>9</button>
          <button className={currentPage === 10 ? "active" : ""} onClick={() => handlePageChange(10)}>10</button>
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(allData.length / 10)}
        >
          Next <FaChevronRight />
        </button>
      </footer>
    </div>
  );
};

export default Leaves;
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
    // ... (reste des données identiques)
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
      <header className="leaves-header full-header">
        <div className="header-left">
          <h1 className="home-title">Home</h1>
          <div className="section-header">
            <h2 className="leaves-subtitle">Latest Leaves Request</h2>
            <p className="description">Keep Lorem IpsumLorem IpsumLorem Ipsum Lorem</p>
          </div>
        </div>

        <div className="header-right">
          <button className="export-btn">
            <FaFileExport /> Export
          </button>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectAll} onChange={(e) => toggleSelectAll(e.target.checked)} /></th>
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
                    <td><input type="checkbox" checked={item.isChecked || false} onChange={() => toggleCheckbox(item.key)} /></td>
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
                    <td className={`status ${item.status.toLowerCase()}`}>{item.status}</td>
                    <td>
                      <button className="approve-btn" onClick={() => handleApprove(item.key)}>✓</button>
                      <button className="delete-btn" onClick={() => handleReject(item.key)}>✗</button>
                    </td>
                  </tr>
                  <tr className="spacer-row"><td colSpan="8"></td></tr>
                </React.Fragment>
              ))
            ) : (
              <tr><td colSpan="8" className="no-data">No data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><FaChevronLeft /> Previous</button>
        <div className="page-numbers">
          {[1, 2, 3].map(num => (
            <button key={num} className={currentPage === num ? "active" : ""} onClick={() => handlePageChange(num)}>{num}</button>
          ))}
          <span>...</span>
          {[8, 9, 10].map(num => (
            <button key={num} className={currentPage === num ? "active" : ""} onClick={() => handlePageChange(num)}>{num}</button>
          ))}
        </div>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === 10}>Next <FaChevronRight /></button>
      </footer>
    </div>
  );
};

export default Leaves;

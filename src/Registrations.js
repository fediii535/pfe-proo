import React, { useState } from 'react';
import './Registrations.css';
import { FaSearch, FaFileExport, FaCheck, FaTimes, FaEye } from 'react-icons/fa';

const Registrations = () => {
  const allData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Mr. User ${index + 1}`,
    role: 'Product Designer',
    email: 'Farouk@gmail.com',
    phone: '+216 24 800 353',
    submissionDate: '02/19/2025 22:52',
    status: 'Pending',
    
  }));

  const [data, setData] = useState(allData.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = allData.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setData(filtered.slice(0, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * 10;
    const filtered = allData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setData(filtered.slice(startIndex, startIndex + 10));
    setCurrentPage(page);
  };

  const toggleSelectAll = (checked) => {
    setSelectAll(checked);
    allData.forEach((item) => (item.isChecked = checked));
    setData(allData.slice((currentPage - 1) * 10, currentPage * 10));
  };

  const toggleCheckbox = (id) => {
    allData.forEach((item) => {
      if (item.id === id) item.isChecked = !item.isChecked;
    });
    setData(allData.slice((currentPage - 1) * 10, currentPage * 10));
  };

  const deleteRow = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="registrations-container">
      <div className="registrations-header">
        <h1>Home</h1>
        <button className="export-button"><FaFileExport /> Export</button>
      </div>

      <p className="registrations-subtitle">Latest Registrations</p>
      <p className="registrations-description">Keep Lorem IpsumLorem IpsumLorem Ipsum Lorem</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="table-container">
        <table className="registrations-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectAll} onChange={(e) => toggleSelectAll(e.target.checked)} /></th>
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
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.isChecked || false}
                      onChange={() => toggleCheckbox(item.id)}
                    />
                  </td>
                  <td>
                    <div className="name-column">
                      <img src={item.avatar} alt="avatar" className="avatar" />
                      <div>
                        <div className="name">{item.name}</div>
                        <div className="role">{item.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.submissionDate}</td>
                  <td className="status-pending">{item.status}</td>
                  <td className="actions">
                    <button className="action-button view"><FaEye /></button>
                    <button className="action-button approve"><FaCheck /></button>
                    <button className="action-button delete" onClick={() => deleteRow(item.id)}><FaTimes /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="no-data">No data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(allData.length / 10) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(allData.length / 10)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Registrations;

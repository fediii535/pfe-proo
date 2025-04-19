import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReadJobs.css"; // Import CSS for styling

function ReadJobs() {
  const [activeSection, setActiveSection] = useState("about");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const tableData = Array.from({ length: 100 }, (_, i) => ({
    name: `User ${i + 1}`,
    role: "Product Designer",
    leaveType: "Vacation",
    startDate: `02/${(i % 28) + 1}/2025 10:00`,
    endDate: `02/${(i % 28) + 1}/2025 18:00`,
    duration: `${(i % 5) + 1} days`,
    status: i % 2 === 0 ? "Pending" : "Approved",
  }));

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

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
        <button className="view-portfolio-btn">+ View portfolio</button>
      </div>

      <div className="tabs-section">
        <button
          className={`tab-button ${activeSection === "about" ? "active-tab" : ""}`}
          onClick={() => setActiveSection("about")}
        >
          Job brief
        </button>
        <button
          className={`tab-button ${activeSection === "members" ? "active-tab" : ""}`}
          onClick={() => setActiveSection("members")}
        >
          Members
        </button>
        <button className="tab-button">Dummy</button>
      </div>

      {activeSection === "about" && (
        <div className="about-section">
          <h2>Job overview</h2>
          <p>A short summary of the job (truncated if too long).</p>
          <div className="job-overview">
            <p>
              Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis.
            </p>
          </div>
          <h2>About the Job</h2>
          <p>
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam.
          </p>
          <ul>
            <li>Ipsum sit mattis nulla quam nulla.</li>
            <li>Non pellentesque congue eget consectetur turpis.</li>
            <li>Sapien, dictum molestie sem tempor.</li>
          </ul>
        </div>
      )}

      {activeSection === "members" && (
        <div className="members-section">
          <table className="members-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
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
              {currentRows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div className="member-info">
                      <div className="member-avatar"></div>
                      <div>
                        <div>{row.name}</div>
                        <div>{row.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>{row.leaveType}</td>
                  <td>{row.startDate}</td>
                  <td>{row.endDate}</td>
                  <td>{row.duration}</td>
                  <td className={`status ${row.status.toLowerCase()}`}>{row.status}</td>
                  <td>
                    <button className="action-btn">✔</button>
                    <button className="action-btn">✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadJobs;
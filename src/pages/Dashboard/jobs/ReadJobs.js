import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye as Eye, FaCheck as Check, FaTimes as X, FaTrashAlt as Trash2 } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import "./ReadJobs.css";

// Initialize Supabase client
const supabaseUrl = 'https://agbpojgpdponyeigrsfs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYnBvamdwZHBvbnllaWdyc2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODk5NzUsImV4cCI6MjA2MTc2NTk3NX0.oWElgbY0Wk9gyFv9tH13pYCePHHQ1vbiqQNarf_zUko';
const supabase = createClient(supabaseUrl, supabaseKey);

function ReadJobs() {
  const [activeSection, setActiveSection] = useState("about");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [data, setData] = useState([]); // Initialize with an empty array
  const [applications, setApplications] = useState([]); // State to store applications
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from Supabase
    const fetchData = async () => {
      console.log("Fetching data from Supabase...");
      const { data: jobs, error: jobsError } = await supabase.from("jobs").select("*");
      const { data: applications, error: applicationsError } = await supabase.from("apply_job").select("*");

      if (jobsError) {
        console.error("Error fetching jobs:", jobsError);
      } else {
        console.log("Fetched jobs:", jobs); // Log the fetched jobs data
        const formattedJobs = jobs.map((job) => ({
          ...job,
          isChecked: false,
          status: new Date(job.deadline) < new Date() ? "Closed" : "Open", // Dynamic status logic
        }));
        setData(formattedJobs);
      }

      if (applicationsError) {
        console.error("Error fetching applications:", applicationsError);
      } else {
        console.log("Fetched applications:", applications); // Log the fetched applications data
        setApplications(applications); // Store applications in state
      }
    };

    fetchData();
  }, []);

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
    const totalPages = Math.ceil(data.length / rowsPerPage);
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
        disabled={page === "..."}>
        {page}
      </button>
    ));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow); // Use `data` for pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from("apply_job")
        .update({ status: "Approved" }) // Update status to "Approved"
        .eq("id", id); // Match the row by ID

      if (error) {
        console.error("Error approving application:", error);
        alert("Failed to approve the application.");
      } else {
        // Update the applications state locally
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: "Approved" } : app
          )
        );
        alert("Application approved successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    }
  };

  const handleReject = async (id) => {
    try {
      const { error } = await supabase
        .from("apply_job")
        .update({ status: "Rejected" }) // Update status to "Rejected"
        .eq("id", id); // Match the row by ID

      if (error) {
        console.error("Error rejecting application:", error);
        alert("Failed to reject the application.");
      } else {
        // Update the applications state locally
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: "Rejected" } : app
          )
        );
        alert("Application rejected successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="read-jobs-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Go Back
      </button> 
      <div className="header-section">
        <div className="job-icon"></div>
        <div className="job-title">
        <h1> {data[currentPage]?.job_name}</h1> {/* Display job_name dynamically */}
        </div>
      
        <p>
          <strong>Status:</strong>{" "}
          <span
            className="job-status"
            style={{
              backgroundColor: new Date(data?.deadline) < new Date() ? "#ffcccc" : "#ccffcc", // Green background for "open"
              color: new Date(data?.deadline) < new Date() ? "red" : "green", // Green text for "open"
              padding: "2px 5px",
              borderRadius: "4px",
            }}
          >
            {new Date(data?.deadline) < new Date() ? "Closed" : "Open"}
          </span>
        </p> {/* Display status dynamically */}
        <button 
          className="view-portfolio-btn" 
          onClick={() => navigate("/CreateClient")}>
          + View submissions
        </button>
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
          }}>
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
          }}>
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
          }}>
          Dummy
        </button>
      </div>

      {activeSection === "about" && (
        <div className="about-section">
          <h2>Job overview</h2>
          {data.length > 0 ? (
            <div className="job-overview">
              <p><strong>Job Name:</strong> {data[currentPage]?.job_name}</p> {/* Display job_name dynamically */}
              <p><strong>Description:</strong> {data[currentPage]?.description || "No description available."}</p> {/* Display description */}
              <p><strong>Submission Date:</strong> {data[currentPage]?.submissionDate}</p> {/* Display submission date */}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className="job-status"
                  style={{
                    backgroundColor: new Date(data[currentPage]?.deadline) < new Date() ? "#ffcccc" : "#ccffcc", // Green background for "open"
                    color: new Date(data[currentPage]?.deadline) < new Date() ? "red" : "green", // Green text for "open"
                    padding: "2px 5px",
                    borderRadius: "4px",
                  }}
                >
                  {new Date(data[currentPage]?.deadline) < new Date() ? "Closed" : "Open"}
                </span>
              </p> {/* Display status dynamically */}
            </div>
          ) : (
            <p>Loading job details...</p> // Fallback while data is loading
          )}
          <h2>About the Job</h2>
          <p>{data[currentPage]?.description || "No description available."}</p> {/* Display description dynamically */}
          <ul>
            <li>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.</li>
            <li>Non pellentesque congue eget consectetur turpis.</li>
            <li>Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus.</li>
          </ul>
        </div>
      )}

      {activeSection === "members" && (
        <div className="members-section">
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#101828", marginBottom: "16px", marginRight: "650px" }}>
            Latest Registrations
          </h2>
          {applications.length > 0 ? (
            <table className="members-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB", textAlign: "left" }}>
                  <th style={{ padding: "12px", fontWeight: "600", fontSize: "14px", color: "#667085" }}>
                    <input type="checkbox" />
                  </th>
                  <th style={{ padding: "12px", fontWeight: "600", fontSize: "14px", color: "#667085" }}>Name</th>
                  <th style={{ padding: "12px", fontWeight: "600", fontSize: "14px", color: "#667085" }}>Email address</th>
                  <th style={{ padding: "12px", fontWeight: "600", fontSize: "14px", color: "#667085" }}>Phone Number</th>
                  <th style={{ padding: "12px", fontWeight: "600", fontSize: "14px", color: "#667085" }}>Submission Date</th>
                  <th style={{ padding: "12px", fontWeight: "600", fontSize: "14px", color: "#667085" }}>Status</th>
                  <th style={{ padding: "12px", fontWeight: "600", fontSize: "14px", color: "#667085" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id} style={{ borderBottom: "1px solid #E4E7EC" }}>
                    <td style={{ padding: "12px" }}>
                      <input type="checkbox" />
                    </td>
                    <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: "500", fontSize: "14px", color: "#101828" }}>
                          {application.first_name} {application.last_name}
                        </p>
                        <p style={{ margin: 0, fontSize: "12px", color: "#667085" }}>{application.role}</p>
                      </div>
                    </td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#101828" }}>{application.email}</td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#101828" }}>{application.phone || "N/A"}</td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#101828" }}>{application.submission_date || "N/A"}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "16px",
                          backgroundColor: application.status === "Approved" ? "#ECFDF3" : "#FEF3F2",
                          color: application.status === "Approved" ? "#027A48" : "#B42318",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}>
                        {application.status || "Pending"}
                      </span>
                    </td>
                    <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleApprove(application.id)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#6941C6",
                        }}>
                        <Eye />
                      </button>
                      <button
                        onClick={() => handleApprove(application.id)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#12B76A",
                        }}>
                        <Check />
                      </button>
                      <button
                        onClick={() => handleReject(application.id)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#F04438",
                        }}>
                        <X />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ReadJobs;
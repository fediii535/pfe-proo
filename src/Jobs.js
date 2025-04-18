import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import "./Jobs.css";
import frameIcon from "./assets/frame.png"; // ✅ Import propre de l'image
import groupIcon from "./assets/Group.png"; // Import the Group.png image
import deleteIcon from "./assets/Delete.png"; // Import the Delete.png image

const defaultJobs = [
  { title: "UI/UX Designer", category: "Design", description: "Short summary of the job", deadline: "2025-04-30", status: "Open" },
  { title: "Graphic Designer", category: "Design", description: "Create visuals for brands", deadline: "2025-05-15", status: "Open" },
  { title: "Frontend Developer", category: "Informatics", description: "Build modern web applications", deadline: "2025-04-20", status: "Open" },
  { title: "Backend Engineer", category: "Informatics", description: "Develop server-side logic", deadline: "2025-06-10", status: "Open" },
  { title: "Data Scientist", category: "Informatics", description: "Analyze large datasets", deadline: "2025-07-01", status: "Open" },
  { title: "Business Analyst", category: "Business", description: "Analyze market trends", deadline: "2025-05-25", status: "Open" },
  { title: "Marketing Manager", category: "Business", description: "Develop marketing strategies", deadline: "2025-06-15", status: "Open" },
  { title: "Project Manager", category: "Business", description: "Manage company projects", deadline: "2025-08-01", status: "Open" },
  { title: "Cybersecurity Analyst", category: "Informatics", description: "Ensure system security", deadline: "2025-07-20", status: "Open" }
];

const categories = ["View all", "Informatics", "Business", "Design"];

function JobCard({ job, shareIcon, editIcon, deleteIcon, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <div className="job-header">
        <div className="job-icon"></div>
        <h3>{job.title}</h3>
        <div className="job-actions">
          <img src={shareIcon} alt="Share" className="job-icon-btn share" style={{ background: "none" }} /> {/* Dynamic share icon */}
          <img src={editIcon} alt="Edit" className="job-icon-btn edit" style={{ background: "none" }} /> {/* Dynamic edit icon */}
          <img src={deleteIcon} alt="Delete" className="job-icon-btn delete" onClick={onDelete} style={{ background: "none" }} /> {/* Replace Trash2 */}
        </div>
      </div>
      <p className="job-description">{job.description}</p>
      <p className="job-deadline">Deadline: {job.deadline}</p>
      <span className="job-status">{job.status}</span>
      <hr />
      <div
        className="job-footer"
        onClick={() => navigate("/sidebar/jobs/read")} // Navigate to ReadJobs
        style={{ cursor: "pointer" }}
      >
        See More
      </div>
    </div>
  );
}

export default function JobListing() {
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [filteredJobs, setFilteredJobs] = useState(defaultJobs);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFilteredJobs(
      category === "View all"
        ? defaultJobs
        : defaultJobs.filter((job) => job.category === category)
    );
  };

  const handleDeleteJob = (jobTitle) => {
    setFilteredJobs((prevJobs) => prevJobs.filter((job) => job.title !== jobTitle));
  };

  return (
    <main className="content">
      <div className="header">
        <div>
          <h1>Jobs</h1>
        </div>
        <Button
          type="primary"
          className="add-job-btn"
          onClick={() => navigate("/sidebar/jobs/create")}
        >
          + Add Job
        </Button>
      </div>

      {/* Job Title Section */}
      <div
        className="job-title-section"
        style={{ textAlign: "left", marginRight: "1010px" }}
      >
        <h2>Job Title</h2>
      </div>

      <p className="subtitle">Lorem Ipsum Lorem Ipsum </p>

      <div className="categories">
        {categories.map((category, i) => (
          <span
            key={i}
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? "active-category" : ""}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="job-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, i) => <JobCard key={i} job={job} shareIcon={frameIcon} editIcon={groupIcon} deleteIcon={deleteIcon} onDelete={() => handleDeleteJob(job.title)} />) /* Pass dynamic share and edit icons */
        ) : (
          <div className="no-jobs">No jobs available</div>
        )}
      </div>
    </main>
  );
}

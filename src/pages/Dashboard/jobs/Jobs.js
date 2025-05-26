import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Jobs.css";
import groupIcon from "../../../assets/Group.png";
import deleteIcon from "../../../assets/Delete.png";
import supabase from '../../../supabase/supabaseClient';

const categories = ["View all", "Informatics", "Business", "Design"];

function JobCard({ job, editIcon, deleteIcon, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <div className="job-header">
        <div className="job-icon"></div>
        <h3>{job.job_name}</h3> {/* Display job_name here */}
        <div className="job-actions">
          <img
            src={editIcon}
            alt="Edit"
            className="job-icon-btn edit"
            onClick={() => navigate("/jobs/create")}
          />
          <img
            src={deleteIcon}
            alt="Delete"
            className="job-icon-btn delete"
            onClick={onDelete}
          />
        </div>
      </div>
      <p className="job-description">{job.description}</p>
      <p className="job-deadline">Deadline: {job.deadline}</p>
      <span
        className="job-status"
        style={{
          backgroundColor: new Date(job.deadline) < new Date() ? "#ffcccc" : "#ccffcc", // Green background for "open"
          color: new Date(job.deadline) < new Date() ? "red" : "green", // Green text for "open"
          padding: "2px 5px",
          borderRadius: "4px",
        }}
      >
        {new Date(job.deadline) < new Date() ? "Closed" : "Open"}
      </span> {/* Match status logic with ReadJobs */}
      <hr />
      <div
        className="job-footer"
        onClick={() => navigate("/jobs/read")}
        style={{ cursor: "pointer" }}
      >
        See More
      </div>
    </div>
  );
}

export default function JobListing() {
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [jobs, setJobs] = useState([]); // State for jobs fetched from Supabase
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase.from("jobs").select("*, job_name");
        if (error) {
          console.error("Error fetching jobs:", error);
        } else {
          setJobs(data); // Set all jobs in state
          setFilteredJobs(data); // Default to all jobs
        }
      } catch (err) {
        console.error("Unexpected error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFilteredJobs(() => {
      if (category === "View all") return jobs;
      if (category === "Business") return jobs.filter((job) => job.category === "Business");
      if (category === "Design") return jobs.filter((job) => job.category === "Design");
      if (category === "Informatics") return jobs.filter((job) => job.category === "Devoloper");
      return [];
    });
  };

  const handleDeleteJob = async (jobId) => {
    const { error } = await supabase.from("jobs").delete().eq("id", jobId);
    if (error) {
      console.error("Error deleting job:", error);
    } else {
      setFilteredJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    }
  };

  const handleEditJob = (job) => {
    return (
      <>
        <div className="header">
          <div>
            <h1>Jobs</h1>
          </div>
          <Button
            type="primary"
            className="add-job-btn"
            onClick={() => navigate("/jobs/create")}
          >
            + Add Job
          </Button>
        </div>

        <div
          className="job-title-section"
          style={{ textAlign: "left", marginRight: "1010px" }}
        >
          <h2>Job Title</h2>
        </div>

        <p className="subtitle">Lorem Ipsum Lorem Ipsum</p>

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
            filteredJobs.map((job, i) => (
              <JobCard
                key={i}
                job={job}
                editIcon={groupIcon}
                deleteIcon={deleteIcon}
                onDelete={() => handleDeleteJob(job.id)}
                onEdit={handleEditJob}
              />
            ))
          ) : (
            <div className="no-jobs">No jobs available</div>
          )}
        </div>
      </>
    );
  };

  return (
    <main>
      <div className="header">
        <div>
          <h1>Jobs</h1>
        </div>
        <Button
          type="primary"
          className="add-job-btn"
          onClick={() => navigate("/jobs/create")}
        >
          + Add Job
        </Button>
      </div>

      <div
        className="job-title-section"
        style={{ textAlign: "left", marginRight: "1010px" }}
      >
        <h2>Job Title</h2>
      </div>

      <p className="subtitle">Lorem Ipsum Lorem Ipsum</p>

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
          filteredJobs.map((job, i) => (
            <JobCard
              key={i}
              job={job}
              editIcon={groupIcon}
              deleteIcon={deleteIcon}
              onDelete={() => handleDeleteJob(job.id)}
              onEdit={handleEditJob}
            />
          ))
        ) : (
          <div className="no-jobs">No jobs available</div>
        )}
      </div>
    </main>
  );
}

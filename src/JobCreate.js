import React, { useState } from 'react';
import './JobCreate.css';
import { FaSearch } from 'react-icons/fa';

const JobCreate = () => {
  const [jobName, setJobName] = useState('');
  const [description, setDescription] = useState('');
  const [jobPicture, setJobPicture] = useState(null);
  const [openSeats, setOpenSeats] = useState(1);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJobPicture(URL.createObjectURL(file));
    }
  };

  return (
    <div className="job-create-container">
      <header className="job-create-header">
        <h1>Create</h1>
      </header>

      <form className="job-create-form">
        <div className="form-header">
          <h2>Personal Info</h2>
          <p>Update your photo and personal details here.</p>
        </div>

        <div className="divider"></div> {/* Divider above Job Name */}
        <div className="form-group">
          <label htmlFor="job-name">Job Name</label>
          <input
            type="text"
            id="job-name"
            placeholder="UI/UX design"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
          />
        </div>
        <div className="divider"></div> {/* Divider below Job Name */}

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Write a short introduction."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="character-count">{275 - description.length} characters left</p>
        </div>
        <div className="divider"></div> {/* Divider below Description */}

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select id="department">
            <option>Design</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="divider"></div> {/* Divider below Department */}

        <div className="form-group">
          <label>Choose Job Picture</label>
          <p className="helper-text">This will be displayed on Job profile.</p>
          <div className="file-upload">
            <div className="file-preview">
              {jobPicture ? (
                <img src={jobPicture} alt="Job" />
              ) : (
                <div className="placeholder-circle"></div>
              )}
            </div>
            <label htmlFor="job-picture" className="upload-label">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="#6A5ACD"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 8L12 3L7 8"
                  stroke="#6A5ACD"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3V15"
                  stroke="#6A5ACD"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Click to upload or drag and drop</p>
              <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
              <input
                type="file"
                id="job-picture"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
        <div className="divider"></div> {/* Divider below Choose Job Picture */}

        <div className="form-group">
          <label htmlFor="open-seats">Number of Open Seats</label>
          <select
            id="open-seats"
            value={openSeats}
            onChange={(e) => setOpenSeats(e.target.value)}
          >
            {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="divider"></div> {/* Divider below Number of Open Seats */}

        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobCreate;
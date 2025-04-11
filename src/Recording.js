import React from 'react';
import './Recording.css';
import { FaFileVideo } from 'react-icons/fa';

const Recording = () => {
  const fileData = [
    {
      id: 1,
      fileName: "Recording.mp4",
      fileSize: "200 KB",
      dateUploaded: "Jan 4, 2022",
      lastUpdated: "Jan 4, 2022",
      updatedBy: "Olivia Rhye",
      email: "Farou@gmail.com"
    },
    {
      id: 2,
      fileName: "Recording.mp4",
      fileSize: "230 KB",
      dateUploaded: "Jan 4, 2022",
      lastUpdated: "Jan 4, 2022",
      updatedBy: "Phoenix Baker",
      email: "Farou@gmail.com"
    },
    {
      id: 3,
      fileName: "Recording.mp4",
      fileSize: "16 MB",
      dateUploaded: "Jan 2, 2022",
      lastUpdated: "Jan 2, 2022",
      updatedBy: "Lisa Sather",
      email: "Farou@gmail.com"
    },
    {
      id: 4,
      fileName: "Recording.mp4",
      fileSize: "4.2 MB",
      dateUploaded: "Jan 6, 2022",
      lastUpdated: "Jan 6, 2022",
      updatedBy: "Dani Wilkinson",
      email: "Farou@gmail.com"
    },
    {
      id: 5,
      fileName: "Recording.mp4",
      fileSize: "400 KB",
      dateUploaded: "Jan 8, 2022",
      lastUpdated: "Jan 8, 2022",
      updatedBy: "Candice Wu",
      email: "Farou@gmail.com"
    },
    {
      id: 6,
      fileName: "Recording.mp4",
      fileSize: "12 MB",
      dateUploaded: "Jan 6, 2022",
      lastUpdated: "Jan 6, 2022",
      updatedBy: "Natal Craig",
      email: "Farou@gmail.com"
    },
    {
      id: 7,
      fileName: "Recording.mp4",
      fileSize: "800 KB",
      dateUploaded: "Jan 4, 2022",
      lastUpdated: "Jan 4, 2022",
      updatedBy: "Drew Care",
      email: "Farou@gmail.com"
    }
  ];

  const handleFileUpload = (e) => {
    const files = e.target.files;
    console.log(files);
  };

  return (
    <div className="recording-container">
      <div className="header-section visible-header">
        <h1>Recordings</h1>
        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Search recordings..." />
          </div>
          <button className="export-btn">Export</button>
        </div>
      </div>

      <div className="upload-section">
        <label className="upload-box">
          <input
            type="file"
            onChange={handleFileUpload}
            multiple
            style={{ display: 'none' }}
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 8L12 3L7 8" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 3V15" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="upload-text">Click to upload or drag and drop</p>
          <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
        </label>
      </div>

      <section className="recording-section">
        <div className="section-header">
          <h2>Attached files</h2>
          <p className="subtitle">Files and assets that have been attached to this project.</p>
        </div>

        <table className="files-table">
          <thead>
            <tr>
              <th className="file-name">
                <input type="checkbox" id="select-all" />
                <label htmlFor="select-all">File name</label>
              </th>
              <th>File size</th>
              <th>Date uploaded</th>
              <th>Last updated</th>
              <th>Updated by</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fileData.map((file) => (
              <tr key={file.id}>
                <td className="file-name">
                  <input type="checkbox" id={`file-${file.id}`} />
                  <FaFileVideo className="file-icon" />
                  <label htmlFor={`file-${file.id}`}>{file.fileName}</label>
                </td>
                <td>{file.fileSize}</td>
                <td>{file.dateUploaded}</td>
                <td>{file.lastUpdated}</td>
                <td>
                  <strong>{file.updatedBy}</strong> {file.email}
                </td>
                <td className="actions-cell">
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Recording;
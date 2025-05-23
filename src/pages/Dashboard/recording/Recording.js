import React, { useState } from 'react';
import './Recording.css';
import { FaFileVideo } from 'react-icons/fa';
import Delete from '../../../assets/Delete.png';
import Icon2 from '../../../assets/Icon2.png';

const Recording = () => {
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [fileData, setFileData] = useState([
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
  ]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    console.log(files);
  };

  const handleView = (file) => {
    alert(`Viewing file: ${file.fileName}`);
  };

  const handleEdit = (file) => {
    alert(`Editing file: ${file.fileName}`);
  };

  const handleDelete = (file) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${file.fileName}?`);
    if (confirmDelete) {
      alert(`Deleted file: ${file.fileName}`);
    }
  };

  const handleCheckboxChange = (e, fileId) => {
    if (e.target.checked) {
      setCheckedFiles([...checkedFiles, fileId]);
    } else {
      setCheckedFiles(checkedFiles.filter(id => id !== fileId));
    }
  };

  const handleClearSelection = () => {
    setFileData(fileData.filter(file => !checkedFiles.includes(file.id)));
    setCheckedFiles([]);
  };

  return (
    <div className="recording-container">
      <div className="header-section visible-header">
        <h1>Recordings</h1>
        <div className="header-actions">
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
          <div className="upload-icon"></div>
          <p className="upload-text">Click to upload or drag and drop</p>
          <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
        </label>
      </div>

      <section className="recording-section">
        <table className="files-table">
          <thead>
            <tr>
              <th colSpan="6" className="table-header">
                {checkedFiles.length === 0 ? (
                  <>
                    <h2>Attached files</h2>
                    <p>Files and assets that have been attached to this project.</p>
                    <div className="subtitle-divider"></div>
                    <div className="filters">
                      <div className="filter-buttons">
                        <button className="view-all-btn">View all</button>
                        <button className="your-files-btn">Your files</button>
                      </div>
                      <div className="search-filter">
                        <input type="text" className="search-input" placeholder="Search" />
                        <button className="filter-btn">Filters</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="green-bar">
                    <span>{checkedFiles.length} file{checkedFiles.length > 1 ? 's' : ''} selected</span>
                    <div className="delete-icon" onClick={handleClearSelection}>
                      <img src={Delete} alt="Delete Icon" className="delete-icon-img" />
                    </div>
                  </div>
                )}
              </th>
            </tr>
            <tr>
              <th className="file-name">
                <div className="file-name-header">
                  <input
                    type="checkbox"
                    id="select-all"
                    onChange={(e) =>
                      setCheckedFiles(e.target.checked ? fileData.map((file) => file.id) : [])
                    }
                    checked={checkedFiles.length === fileData.length}
                  />
                  <label htmlFor="select-all">File name</label>
                </div>
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
                  <div className="file-name-content">
                    <input
                      type="checkbox"
                      id={`file-${file.id}`}
                      checked={checkedFiles.includes(file.id)}
                      onChange={(e) => handleCheckboxChange(e, file.id)}
                    />
                    <img src={Icon2} alt="File Icon" className="file-icon-img" />
                    <label htmlFor={`file-${file.id}`}>{file.fileName}</label>
                  </div>
                </td>
                <td>{file.fileSize}</td>
                <td>{file.dateUploaded}</td>
                <td>{file.lastUpdated}</td>
                <td>
                  <strong>{file.updatedBy}</strong> {file.email}
                </td>
                <td className="actions-cell">
                  <button className="action-btn view" onClick={() => handleView(file)}>View</button>
                  <button className="action-btn edit" onClick={() => handleEdit(file)}>Edit</button>
                  <button className="action-btn delete" onClick={() => handleDelete(file)}>Delete</button>
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

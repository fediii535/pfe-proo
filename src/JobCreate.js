import React, { useState } from 'react';
import './Settings.css';
import { Input, Dropdown, Menu, Select, DatePicker } from 'antd'; // Import DatePicker from antd
import { DownOutlined } from '@ant-design/icons';

const Settings = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Create your department');
  const [jobName, setJobName] = useState('');
  const [description, setDescription] = useState('');
  const [openSeats, setOpenSeats] = useState(null);
  const [department, setDepartment] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [errors, setErrors] = useState({}); // State for field errors

  const handleMenuClick = (e) => {
    setSelectedDepartment(e.key);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!jobName) newErrors.jobName = 'Job name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!openSeats) newErrors.openSeats = 'Number of open seats is required';
    if (!department) newErrors.department = 'Department is required';
    if (!deadline) newErrors.deadline = 'Deadline is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully');
      // Add form submission logic here
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Marketing">Marketing</Menu.Item>
      <Menu.Item key="Development">Development</Menu.Item>
      <Menu.Item key="Design">Design</Menu.Item>
    </Menu>
  );

  // Options for Number Of Open Seats
  const openSeatsOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  // Options for Department
  const departmentOptions = [
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Design', label: 'Design' },
    { value: 'Developer', label: 'Developer' },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`); // Corrected syntax
  };

  return (
    <div className="profile-settings">
      <h1>Create Job</h1>

      <section className="company-profile">
        <h2 style={{ textAlign: 'left' }}>Personal Info </h2>
        <p className="profile-description">Update your company photo and details here.</p>

        <div className="form-section">
          {/* Job Name */}
          <div className="form-row">
            <div className="label-col">
              <label>Job Name</label>
            </div>
            <div className="input-col">
              <input
                type="text"
                className="input-field"
                placeholder="Create your Job name"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
              />
              {errors.jobName && <p className="error-message">{errors.jobName}</p>}
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Description */}
          <div className="form-row">
            <div className="label-col">
              <label>Description</label>
              <p className="description">Write a short introduction</p>
            </div>
            <div className="input-col">
              <textarea
                className="input-field"
                placeholder="Write a short description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <p className="error-message">{errors.description}</p>}
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Profile Picture Upload */}
          <div className="form-row">
            <div className="label-col">
              <label>Choose Job Picture</label>
              <p className="description">This will be displayed on job profile.</p>
            </div>
            <div className="input-col">
              <div className="avatar-upload">
                <div className="avatar-preview"></div> {/* Circle on the left */}
                <div className="upload-area">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 16V8M12 8L8 12M12 8L16 12M20 16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16C4 13.7909 5.79086 12 8 12H9" 
                      stroke="#6941C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Click to upload <span>or drag and drop</span></p>
                  <p className="file-types">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Number of Open Seats, Department, Deadline */}
          <div className="form-row">
            <div className="label-col">
              <label>Number Of Open Seats</label> <br />
              <label>Department</label> <br />
              <label>Deadline</label>
            </div>
            <div className="input-col">
              <Select
                className="input-field no-border"
                placeholder="Enter Number Of Open Seats"
                onChange={(value) => setOpenSeats(value)}
                options={openSeatsOptions}
              />
              {errors.openSeats && <p className="error-message">{errors.openSeats}</p>}
              <br />
              <Select
                className="input-field no-border"
                placeholder="Enter Department"
                onChange={(value) => setDepartment(value)}
                options={departmentOptions}
              />
              {errors.department && <p className="error-message">{errors.department}</p>}
              <br />
              <DatePicker
                className="input-field"
                placeholder="Select Deadline"
                format="YYYY/MM/DD"
                onChange={(date, dateString) => setDeadline(dateString)}
              />
              {errors.deadline && <p className="error-message">{errors.deadline}</p>}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="cancel-button">Cancel</button>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </section>

      <div className="divider"></div>
    </div>
  );
};

export default Settings;
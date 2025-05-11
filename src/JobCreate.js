import React, { useState } from 'react';
import './Settings.css';
import { Input, Dropdown, Menu, Select, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { createClient } from '@supabase/supabase-js';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

// Initialize Supabase client
const supabaseUrl = 'https://agbpojgpdponyeigrsfs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYnBvamdwZHBvbnllaWdyc2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODk5NzUsImV4cCI6MjA2MTc2NTk3NX0.oWElgbY0Wk9gyFv9tH13pYCePHHQ1vbiqQNarf_zUko';
const supabase = createClient(supabaseUrl, supabaseKey);

const Settings = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Create your department');
  const [jobName, setJobName] = useState('');
  const [description, setDescription] = useState('');
  const [openSeats, setOpenSeats] = useState(null);
  const [department, setDepartment] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [errors, setErrors] = useState({}); // State for field errors
  const [bgColor, setBgColor] = useState(''); // State for background color
  const [uploadBgColor, setUploadBgColor] = useState(''); // State for upload field background color
  const [formRowBgColor, setFormRowBgColor] = useState(''); // State for form-row background color

  const handleMenuClick = (e) => {
    setSelectedDepartment(e.key);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setUploadBgColor('#d4edda'); // Set upload field background to cool green
      setFormRowBgColor('#d4edda'); // Set form-row background to cool green
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from('job-images') // Replace 'job-images' with your storage bucket name
      .upload(fileName, imageFile);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { publicURL } = supabase.storage.from('job-images').getPublicUrl(fileName);
    return publicURL;
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!jobName) newErrors.jobName = 'Job name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!openSeats) newErrors.openSeats = 'Number of open seats is required';
    if (!department) newErrors.department = 'Department is required';
    if (!deadline) newErrors.deadline = 'Deadline is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const imageUrl = await handleImageUpload();

        const { data, error } = await supabase
          .from('jobs') // Replace 'jobs' with your table name
          .insert([
            {
              job_name: jobName,
              description: description,
              open_seats: openSeats,
              department: department,
              deadline: deadline,
              image_url: imageUrl, // Save image URL
            },
          ]);

        if (error) {
          console.error('Error inserting data:', error);
          toast.error('Failed to create the job. Please try again.');
        } else {
          console.log('Data inserted successfully:', data);
          toast.success('Job created successfully! 🎉');
          setBgColor('#d4edda'); // Set background color to cool green
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred. Please try again.');
      }
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
    <div className="profile-settings" style={{ backgroundColor: bgColor }}>
      <ToastContainer /> {/* Add ToastContainer to render toast messages */}
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
          <div
            className="form-row"
            style={{ backgroundColor: formRowBgColor }} // Apply dynamic background color
          >
            <div className="label-col">
              <label>Choose Job Picture</label>
              <p className="description">This will be displayed on job profile.</p>
            </div>
            <div className="input-col">
              <div
                className="avatar-upload"
                style={{ backgroundColor: uploadBgColor }} // Apply dynamic background color
              >
                {imagePreview && (
                  <div className="avatar-preview">
                    <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                  </div>
                )}
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
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
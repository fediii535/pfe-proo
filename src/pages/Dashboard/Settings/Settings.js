import React, { useState } from 'react';
import './Settings.css';
import { Input, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Settings = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Create your department');
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    hiringDate: '',
    ratePerMonth: '',
  });
  const [errors, setErrors] = useState({});

  const handleMenuClick = (e) => {
    setSelectedDepartment(e.key);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' }); // Clear error when user types
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.hiringDate) newErrors.hiringDate = 'Hiring date is required';
    if (!formData.ratePerMonth) newErrors.ratePerMonth = 'Rate per month is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Save logic here
      console.log('Form data saved:', formData);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Marketing">Marketing</Menu.Item>
      <Menu.Item key="Development">Development</Menu.Item>
      <Menu.Item key="Design">Design</Menu.Item>
      <Menu.Item key="comptabilité">comptabilité</Menu.Item>
    </Menu>
  );

  return (
    <div className="profile-settings">
      <h1>Profile Settings</h1>

      <section className="company-profile" >
        <h2 style={{ textAlign: 'left' }}>User profile </h2> 
        <p className="profile-description">Update your company photo and details here.</p>

        <div className="form-section">
          {/* Name */}
          <div className="form-row">
            <div className="label-col">
              <label>Name</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <input
                type="text"
                className="input-field"
                placeholder="Create your name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Last name */}
          <div className="form-row">
            <div className="label-col">
              <label>Last name</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <input
                type="text"
                className="input-field"
                placeholder="Create your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
              {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Email */}
          <div className="form-row">
            <div className="label-col">
              <label>Email</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <input
                type="text"
                className="input-field"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Profile Picture Upload */}
          <div className="form-row">
            <div className="label-col">
              <label>Profile PC</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
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

          <div className="divider-line"></div>

          {/* Hiring date */}
          <div className="form-row">
            <div className="label-col">
              <label>Hiring date</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <input
                type="text"
                className="input-field"
                placeholder="Enter hiring date"
                value={formData.hiringDate}
                onChange={(e) => handleInputChange('hiringDate', e.target.value)}
              />
              {errors.hiringDate && <p className="error-message">{errors.hiringDate}</p>}
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Rate per month */}
          <div className="form-row">
            <div className="label-col">
              <label>Rate per month</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <input
                type="text"
                className="input-field"
                placeholder="Enter rate per month"
                value={formData.ratePerMonth}
                onChange={(e) => handleInputChange('ratePerMonth', e.target.value)}
              />
              {errors.ratePerMonth && <p className="error-message">{errors.ratePerMonth}</p>}
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Department */}
          <div className="form-row">
            <div className="label-col">
              <label>Department</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <Input
                className="input-department"
                addonBefore="SoftySkills"
                addonAfter={
                  <Dropdown overlay={menu} trigger={['click']}>
                    <DownOutlined style={{ cursor: 'pointer' }} />
                  </Dropdown>
                }
                value={selectedDepartment}
                readOnly
              />
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

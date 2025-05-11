import React, { useState, useRef } from 'react';
import './CreateClient.css';
import { FaSearch, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaUpload, FaFileAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

const supabaseUrl = 'https://agbpojgpdponyeigrsfs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYnBvamdwZHBvbnllaWdyc2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODk5NzUsImV4cCI6MjA2MTc2NTk3NX0.oWElgbY0Wk9gyFv9tH13pYCePHHQ1vbiqQNarf_zUko';
const supabase = createClient(supabaseUrl, supabaseKey); // Initialize Supabase client

const CreateClient = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
   
    country: 'FR',
    date: '',
    search: '',
    role: '',
    timezone: 'UTC+00:00',
    bio: '',
    photo: null,
    resume: null,
    motivationalLetter: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [bioFormat, setBioFormat] = useState('normal'); // State for text format
  const bioTextareaRef = useRef(null); // Ref for the textarea

  const countries = [
    { code: 'FR', name: 'France', flag: 'https://flagcdn.com/fr.svg' },
    { code: 'US', name: 'USA', flag: 'https://flagcdn.com/us.svg' },
    { code: 'MA', name: 'Maroc', flag: 'https://flagcdn.com/ma.svg' },
    { code: 'DE', name: 'Allemagne', flag: 'https://flagcdn.com/de.svg' },
    { code: 'ES', name: 'Espagne', flag: 'https://flagcdn.com/es.svg' },
    { code: 'IT', name: 'Italie', flag: 'https://flagcdn.com/it.svg' },
    { code: 'TU', name: 'Tunisie', flag: 'https://flagcdn.com/tn.svg' },
  ];

  const timezones = [
    'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00',
    'UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00',
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Dynamically update the preview
        setFormData({ ...formData, photo: file }); // Update the formData with the selected file
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const removeFile = (field) => {
    setFormData({ ...formData, [field]: null });
  };

  const handleFormatChange = (e) => {
    setBioFormat(e.target.value);
    const textarea = bioTextareaRef.current;
    if (!textarea) return;

    if (e.target.value === 'heading') {
      textarea.style.fontWeight = 'bold';
      textarea.style.fontSize = '18px';
    } else if (e.target.value === 'subheading') {
      textarea.style.fontWeight = 'bold';
      textarea.style.fontSize = '16px';
    } else {
      textarea.style.fontWeight = 'normal';
      textarea.style.fontSize = '14px';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const { data, error } = await supabase.from('apply_job').insert([
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
    
        country: formData.country,
        role: formData.role,
        timezone: formData.timezone,
        bio: formData.bio,
      },
    ]);

    if (error) {
      console.error('Error inserting data:', error);
      setErrors({ submit: 'Failed to save data. Please try again.' });
    } else {
      console.log('Data inserted successfully:', data);
      alert('Data saved successfully!'); // Display success message
    }
  };

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="content-container">
        <div className="create-client-container">
          <h2>Create</h2>
          <div>
            <h3>Personal Info</h3>
            <p>Update your photo and personal detail here</p>
            <hr />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="label-col">
                <label>Name</label>
              </div>
              <div className="input-col name-row">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="input-field"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="label-col">
                <label>Email address</label>
              </div>
              <div className="input-col">
                <div className="input-icon">
                  <FaEnvelope className="icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="faroukabichou@gmail.com"
                    className="input-field"
                  />
                </div>
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
                  {imagePreview && (
                    <div className="avatar-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                  <div className="upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange} // Ensure this function is called on file selection
                    />
                    <p>Click to upload <span>or drag and drop</span></p>
                    <p className="file-types">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="label-col">
                <label>Role</label>
              </div>
              <div className="input-col">
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Product Designer"
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="label-col">
                <label>Country</label>
              </div>
              <div className="input-col">
                <div className="country-select">
                  <img
                    src={countries.find((c) => c.code === formData.country)?.flag}
                    alt="flag"
                    className="flag-icon"
                  />
                  <select name="country" value={formData.country} onChange={handleChange}>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="label-col">
                <label>Timezone</label>
              </div>
              <div className="input-col">
                <select name="timezone" value={formData.timezone} onChange={handleChange} className="timezone-select">
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="label-col">
                <label>Bio</label>
                <p className="description">Write a short introduction.</p>
              </div>
              <div className="input-col">
                <div className="bio-toolbar">
                  <select
                    className="bio-format-dropdown"
                    value={bioFormat}
                    onChange={handleFormatChange}
                  >
                    <option value="normal">Normal text</option>
                    <option value="heading">Heading</option>
                    <option value="subheading">Subheading</option>
                  </select>
                  <div className="bio-format-actions">
                    <button type="button" className="format-btn bold">B</button>
                    <button type="button" className="format-btn italic">I</button>
                    <button type="button" className="format-btn link">🔗</button>
                    <button type="button" className="format-btn list">•</button>
                  </div>
                </div>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
                  className="bio-textarea"
                  ref={bioTextareaRef}
                />
                <p className="character-count">{275 - formData.bio.length} characters left</p>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="form-row">
              <div className="label-col">
                <label>Upload Resume</label>
                <p className="description">Share with us your resume.</p>
              </div>
              <div className="input-col">
                <div className="upload-area">
                  {!formData.resume ? (
                    <>
                      <FaUpload className="icon" />
                      <p className="upload-text">
                        <span>Click to upload</span> or drag and drop
                      </p>
                      <p className="file-types">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className="upload-input"
                      />
                    </>
                  ) : (
                    <div className="file-preview">
                      <FaFileAlt className="file-icon" />
                      <div>
                        <p className="file-name">{formData.resume.name}</p>
                        <p className="file-size">200 KB – 100% uploaded</p>
                      </div>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFile('resume')}
                      >
                        ✔
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Motivational Letter Upload */}
            <div className="form-row">
              <div className="label-col">
                <label>Motivational Letter</label>
                <p className="description">Share with us your resume.</p>
              </div>
              <div className="input-col">
                <div className="upload-area">
                  {!formData.motivationalLetter ? (
                    <>
                      <FaUpload className="icon" />
                      <p className="upload-text">
                        <span>Click to upload</span> or drag and drop
                      </p>
                      <p className="file-types">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                      <input
                        type="file"
                        name="motivationalLetter"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className="upload-input"
                      />
                    </>
                  ) : (
                    <div className="file-preview">
                      <FaFileAlt className="file-icon" />
                      <div>
                        <p className="file-name">{formData.motivationalLetter.name}</p>
                        <p className="file-size">200 KB – 100% uploaded</p>
                      </div>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFile('motivationalLetter')}
                      >
                        ✔
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="form-actions">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClient;

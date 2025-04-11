import React from 'react';
import './Settings.css';

const Settings = () => {
  return (
    <div className="profile-settings">
      <h1>Profile Settings</h1>
      
      <section className="company-profile">
        <h2>Company profile</h2>
        <p className="profile-description">Update your company photo and details here.</p>
        
        <div className="form-section">
          <div className="form-row">
            <div className="label-col">
              <label>Name</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <input type='text'className="input-field"/>
            </div>
          </div>
          
          <div className="divider-line"></div>
          
          <div className="form-row">
            <div className="label-col">
              <label>Last name</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <input type='text' className="input-field"/>
            </div>
          </div>
          
          <div className="divider-line"></div>
          
          <div className="form-row">
            <div className="label-col">
              <label>Email</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <input type='text'className="input-field"/>
            </div>
          </div>
          
          <div className="divider-line"></div>
          
          <div className="form-row">
            <div className="label-col">
              <label>Profile PC</label>
              <p className="description">This will be displayed on your profile. This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
              <div className="upload-area">
                <p>Click to upload or drag and drop</p>
                <p className="file-types">SVR_PRO_Pro a rdf: https://www.srbrs.io/opai</p>
              </div>
            </div>
          </div>
          
          <div className="divider-line"></div>
          
          <div className="form-row">
            <div className="label-col">
              <label>Hiring date</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
            <input type='text'className="input-field"/>
            </div>
          </div>
          
          <div className="divider-line"></div>
          
          <div className="form-row">
            <div className="label-col">
              <label>Rate per month</label>
              <p className="description">This will be displayed on your profile.</p>
            </div>
            <div className="input-col">
            <input type='text'className="input-field"/>
            </div>
          </div>
          
          <div className="divider-line"></div>
          
          <div className="form-row">
            <div className="label-col">
              <label>Department</label>
            </div>
            <div className="input-col">
            <input type='text'className="input-field"/>
            </div>
          </div>
        </div>
        
        <div className="button-group">
          <button className="cancel-button">Cancel</button>
          <button className="save-button">Save</button>
        </div>
      </section>
      
      <div className="divider"></div>
      
     
    </div>
  );
};

export default Settings;
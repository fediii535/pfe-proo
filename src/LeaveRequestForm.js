import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeaveRequestForm.css";

const LeaveRequestForm = () => {
  const navigate = useNavigate();
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leaveDate || !leaveType || !description) {
      setError(true);
    } else {
      setError(false);
      alert("Leave request submitted!");
      navigate("/home");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Apply For Leave</h2>
        <p className="modal-subtitle">Please fill in the form below</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">Leave Date</label>
            <input
              type="date"
              value={leaveDate}
              onChange={(e) => setLeaveDate(e.target.value)}
              className="form-input"
            />
            <p className="hint">Select the date you want to take off.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="form-select"
            >
              <option value="">Select...</option>
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal</option>
            </select>
            <p className="hint">Choose the type of leave.</p>
          </div>

         

          <div className="form-buttons">
            <button
              type="button"
              className="button cancel"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
            <button type="submit" className="button apply">
              Apply For Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestForm;

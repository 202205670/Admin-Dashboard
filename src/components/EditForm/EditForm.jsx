import React, { useState } from 'react';
import "./EditForm.css";

const EditForm = ({ title, fields, statusLabel, showStatusCheckbox, onSubmit, onCancel }) => {
  // Initialize formData without initialData
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = ''; // Initialize each field with an empty string
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData(fields.reduce((acc, field) => {
      acc[field.name] = ''; // Reset each field to an empty string
      return acc;
    }, {}));
    if (onCancel) onCancel(); // Call onCancel if provided
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  className="form-input"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {field.label}
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  className="form-input"
                  onChange={handleChange}
                  // Removed placeholder
                />
              )}
            </div>
          ))}
        </div>

        {/* Status checkbox section */}
        {showStatusCheckbox && (
          <div className="status-container">
            <div className="status-label">Status</div>
            <div className="checkbox-row">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active || false} // Use formData.active for checkbox state
                onChange={(e) =>
                  setFormData({ ...formData, active: e.target.checked })
                }
              />
              <label htmlFor="active" className="checkbox-label">
                {statusLabel}
              </label>
            </div>
          </div>
        )}

        {/* Form action buttons */}
        <div className="form-actions">
          <button type="button" className="form-btn cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="form-btn save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;

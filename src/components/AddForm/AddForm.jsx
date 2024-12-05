import React, { useState } from 'react';
import './AddForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AddForm = ({
  title,
  fields,
  statusLabel,
  showStatusCheckbox,
  secondTitle,
  secondFields = [],
  onSubmit,
  onCancel,
  consignments = [],
  showTable = false,
  onAssignConsignment,
  onDeleteConsignment,
  isAddRunsheetPage, // New prop for conditionally showing the Assign button
}) => {
  const [formData, setFormData] = useState(
    fields.concat(secondFields).reduce((acc, field) => {
      if (!field.sectionTitle) {
        acc[field.name] = ''; // Initialize each input field with an empty string
      }
      return acc;
    }, {})
  );

  const [newConsignment, setNewConsignment] = useState({
    consignmentNumber: '',
    type: '',
    priority: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewConsignmentChange = (e) => {
    setNewConsignment({ ...newConsignment, [e.target.name]: e.target.value });
  };

  const handleAssign = () => {
    if (newConsignment.consignmentNumber && newConsignment.type) {
      onAssignConsignment(newConsignment);
      setNewConsignment({ consignmentNumber: '', type: '', priority: '' }); // Reset after assigning
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData(
      fields.concat(secondFields).reduce((acc, field) => {
        if (!field.sectionTitle) {
          acc[field.name] = ''; // Reset each input field to an empty string
        }
        return acc;
      }, {})
    );
    if (onCancel) onCancel();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          {fields.map((field, index) =>
            field.type === "checkbox" ?  <div className="status-container">
          <div className="status-label">Status</div>
          <div className="checkbox-row">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active || false}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
            />
            <label htmlFor="active" className="checkbox-label">
              {statusLabel}
            </label>
          </div>
        </div> :
            field.sectionTitle ? (
              <h3 key={index} className="form-section-title">
                {field.sectionTitle}
              </h3>
            ) : (
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
                      Select {field.label}
                    </option>
                    {field.options.map((option) => (
                      <option key={option} value={option.value}>
                        {option.label}
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
                  />
                )}
              </div>
            )
          )}
        </div>

        {secondTitle && (
          <>
            <h2 className="form-title">{secondTitle}</h2>
            <div className="form-grid">
              {secondFields.map((field, index) =>
                field.sectionTitle ? (
                  <h3 key={index} className="form-section-title">
                    {field.sectionTitle}
                  </h3>
                ) : (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={newConsignment[field.name]}
                        className="form-input"
                        onChange={handleNewConsignmentChange}
                      >
                        <option value="" disabled>
                          Select {field.label}
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
                        value={newConsignment[field.name]}
                        className="form-input"
                        onChange={handleNewConsignmentChange}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* Conditionally render the Assign button based on isAddRunsheetPage */}
        {isAddRunsheetPage && (
          <div className="form-group">
            <button type="button" className="form-btn assign-btn" onClick={handleAssign}>
              Assign
            </button>
          </div>
        )}

        {/* Optional Status Checkbox */}
        {showStatusCheckbox && (
          <div className="status-container">
            <div className="status-label">Status</div>
            <div className="checkbox-row">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active || false}
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

        {/* Table Section for Assigned Consignments */}
        {showTable && (
          <div className="table-section">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Consignment #</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Actions</th> 
                </tr>
              </thead>
              <tbody>
                {consignments.map((consignment, index) => (
                  <tr key={index}>
                    <td>{consignment.consignmentNumber}</td>
                    <td>{consignment.type}</td>
                    <td>{consignment.priority}</td>
                    <td>
                      <FontAwesomeIcon 
                        icon={faTrash} 
                        className="delete-icon" 
                        onClick={() => onDeleteConsignment(index)} // Call the delete function
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form Action Buttons */}
        <div className="form-actions">
          <button type="button" className="form-btn cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="form-btn create-btn">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;

import React, { useState } from 'react';
import './EditForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const EditForm = ({
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
  isEditRunsheetPage,
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      if (!field.sectionTitle) {
        acc[field.name] = '';
      }
      return acc;
    }, {})
  );

  const [newConsignment, setNewConsignment] = useState({
    consignmentNumber: '',
    type: '',
    priority: '',
  });

  // Handle change for general form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle change for consignment data only
  const handleNewConsignmentChange = (e) => {
    setNewConsignment({ ...newConsignment, [e.target.name]: e.target.value });
  };

  // Assign button only for consignment data
  const handleAssign = () => {
    if (newConsignment.consignmentNumber && newConsignment.type && newConsignment.priority) {
      onAssignConsignment(newConsignment);
      setNewConsignment({ consignmentNumber: '', type: '', priority: '' });
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Form submit handler for main form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData(
      fields.reduce((acc, field) => {
        if (!field.sectionTitle) {
          acc[field.name] = '';
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
              {secondFields.map((field) => (
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
              ))}
            </div>
          </>
        )}

        {isEditRunsheetPage && (
          <div className="form-group">
            <button type="button" className="form-btn assign-btn" onClick={handleAssign}>
              Assign
            </button>
          </div>
        )}

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
                        onClick={() => onDeleteConsignment(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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

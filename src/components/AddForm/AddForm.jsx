import React, { useState } from 'react';
import TableComponent from "../../components/Table/TableComponent";
import './AddForm.css';

const AddForm = ({
  title,
  fields,
  statusLabel,
  showStatusCheckbox,
  secondTitle,
  secondFields = [],
  tableData,
  tableColumns,
  editPageUrl,
  pageSpecificIcons,
  onSubmit,
  onCancel,
  secondButtonLabel, // New prop for the second button label
  onSecondButtonClick, // New prop for the second button click handler
}) => {
  const [formData, setFormData] = useState(
    fields.concat(secondFields).reduce((acc, field) => {
      if (!field.sectionTitle) {
        acc[field.name] = ''; // Initialize each input field with an empty string
      }
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
      {/* Primary Title */}
      <h2 className="form-title">{title}</h2>

      {/* Primary Boxes */}
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

        {/* Optional Secondary Title and Boxes */}
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
          </>
        )}

        {/* Status Checkbox */}
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

        {/* Table Section */}
        {tableData && tableColumns && (
          <div className="table-section">
            <h3 className="form-section-title">Current Entries</h3>
            <TableComponent
              columns={tableColumns}
              data={tableData}
              editPageUrl={editPageUrl}
              pageSpecificIcons={pageSpecificIcons}
            />
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
          {onSecondButtonClick && ( // Render the second button if the handler is provided
            <button type="button" className="form-btn assign-btn" onClick={onSecondButtonClick}>
              {secondButtonLabel}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddForm;

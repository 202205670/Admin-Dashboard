import React, { useState } from "react";
import "./PageWrapper.css";

const PageWrapper = ({
  title,
  filters = [],
  placeholders = {},
  onSearch,
  onBranchChange,
  onStatusChange,
  addButtonLabel,
  onAddClick,
  showAddButton = true,
  children,
  statusOptions = [], // New prop for status options
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // Call the provided search handler
    }
  };

  // Handle branch selection change
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    if (onBranchChange) {
      onBranchChange(e.target.value); // Call the provided branch change handler
    }
  };

  // Handle status selection change
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (onStatusChange) {
      onStatusChange(e.target.value); // Call the provided status change handler
    }
  };

  return (
    <div className="pageWrapper">
      {title && <h1 className="pageTitle">{title}</h1>} {/* Conditionally render the title */}

      <div className="filterBar">
        <div className="searchFilters">
          {/* Conditionally render the search input if 'search' is included in filters */}
          {filters.includes("search") && (
            <input
              type="text"
              placeholder={placeholders.search || "Search"}
              value={searchTerm}
              onChange={handleSearch} // Trigger search handler on change
              className="searchInput"
            />
          )}

          {/* Conditionally render the branch select dropdown */}
          {filters.includes("branch") && (
            <select
              value={branch}
              onChange={handleBranchChange} // Trigger branch handler on change
              className="branchSelect"
            >
              <option value="" disabled>
                {placeholders.branch || "Branch"}
              </option>
              <option value="Sydney">Sydney</option>
              <option value="Brisbane">Brisbane</option>
              <option value="Melbourne">Melbourne</option>
            </select>
          )}

          {/* Conditionally render the status select dropdown */}
          {filters.includes("status") && (
            <select
              value={status}
              onChange={handleStatusChange} // Trigger status handler on change
              className="statusSelect"
            >
              <option value="" disabled>
                {placeholders.status || "Status"}
              </option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>

        {/* Conditionally render the Add button */}
        {showAddButton && (
          <div className="addButtonContainer">
            <button className="addButton" onClick={onAddClick}>
              {addButtonLabel || "Add"}
            </button>
          </div>
        )}
      </div>

      {/* Render children components */}
      {children}
    </div>
  );
};

export default PageWrapper;

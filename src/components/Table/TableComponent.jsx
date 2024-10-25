import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the edit icon
import './TableComponent.css'; // Ensure this file exists and is styled correctly

const TableComponent = ({ columns, data, editPageUrl, pageSpecificIcons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Pagination size
  const navigate = useNavigate();

  // Calculate data for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentData = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Edit Click
  const handleEdit = (id) => {
    navigate(`${editPageUrl}/${id}`);
  };

  // Generate page numbers for pagination
  const totalPages = Math.ceil(data.length / recordsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(n => n + 1);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {/* Add icons specific to each page */}
            {pageSpecificIcons && (
              <th>
                <FontAwesomeIcon icon={pageSpecificIcons} />
              </th>
            )}
            {columns.map((column, index) => (
              <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index}>
                {/* If icons specific to page exist, render them in the first cell */}
                {pageSpecificIcons && (
                  <td>
                    <FontAwesomeIcon icon={pageSpecificIcons} />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column]}</td>
                ))}
                <td>
                  <button onClick={() => handleEdit(row.id)}>
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (pageSpecificIcons ? 2 : 1)} style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;

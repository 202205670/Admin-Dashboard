import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './TableComponent.css';

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
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  // Helper function to get column label and key
  const getColumnLabel = (column) =>
    typeof column === 'string' ? column.charAt(0).toUpperCase() + column.slice(1) : column.label;
  const getColumnKey = (column) => (typeof column === 'string' ? column : column.key);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>{getColumnLabel(columns[0])}</th> {/* Combined icon and first column header */}
            {columns.slice(1).map((column, index) => (
              <th key={index + 1}>{getColumnLabel(column)}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index}>
                <td className="icon-cell">
                  {/* Render the page-specific icon alongside the first column data */}
                  {pageSpecificIcons && (
                    <FontAwesomeIcon icon={pageSpecificIcons} className="row-icon" />
                  )}
                  {row[getColumnKey(columns[0])]} {/* First column data */}
                </td>
                {columns.slice(1).map((column, colIndex) => (
                  <td key={colIndex + 1}>{row[getColumnKey(column)]}</td>
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
              <td colSpan={columns.length + 1} style={{ textAlign: 'center' }}>
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

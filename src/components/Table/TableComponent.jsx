import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./TableComponent.css";
import Spinner from "../Spinner/Spinner";

const TableComponent = ({
  columns,
  data,
  editPageUrl,
  pageSpecificIcons,
  isRunsheetPage,
  onRowClick,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const navigate = useNavigate();

  // Calculate data for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentData = data?.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const totalPages = Math.ceil(data?.length / recordsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  // Helper functions for column label and key
  const getColumnLabel = (column) =>
    typeof column === "string"
      ? column.charAt(0).toUpperCase() + column.slice(1)
      : column.label;

  const getColumnKey = (column) =>
    typeof column === "string" ? column : column.key;

  // Helper to render status with CSS classes
  const renderStatus = (status) => {
    const statusClass = status === "Active" ? "active" : "inactive";
    return (
      <div style={{ display:"flex",gap:"5px" }}>
        <div style={{width:"30%",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div className={`status-circle ${statusClass}`}></div>
        </div>
        <div style={{width:"70%"}}>{status}</div>
      </div>
    );
  };

  return (
    <div className="table-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <table className="custom-table">
            <thead>
              <tr>
                <th>{getColumnLabel(columns[0])}</th>{" "}
                {/* Icon + first column header */}
                {columns.slice(1).map((column, index) => (
                  <th key={index + 1}>{getColumnLabel(column)}</th>
                ))}
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.length > 0 ? (
                currentData?.map((row, index) => (
                  <tr
                    key={index}
                    onClick={
                      isRunsheetPage ? () => onRowClick(row.id) : undefined
                    } // Row click event only on Runsheet page
                  >
                    <td className="icon-cell">
                      {pageSpecificIcons && (
                        <FontAwesomeIcon
                          icon={pageSpecificIcons}
                          className="row-icon"
                        />
                      )}
                      {row[getColumnKey(columns[0])] || "-"}{" "}
                      {/* Default value if undefined */}
                    </td>
                    {columns.slice(1).map((column, colIndex) => {
                      const columnKey = getColumnKey(column);
                      const cellData = row[columnKey] || "-";

                      return (
                        <td key={colIndex + 1}>
                          {columnKey === "status"
                            ? renderStatus(cellData) // Render status with styling
                            : cellData}
                        </td>
                      );
                    })}
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click when editing
                          navigate(`${editPageUrl}/${row.id}`);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    style={{ textAlign: "center" }}
                  >
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
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TableComponent;

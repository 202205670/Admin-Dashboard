import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./BranchesPage.css";

const BranchesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Example branches data (replace with your actual data)
  const branchesData = [
    { id: 1, name: 'Sydney', address: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual.' },
    { id: 2, name: 'Melbourne', address: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual.' },
    { id: 3, name: 'Brisbane', address: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual.' },
  ];

  // Filter branches based on the search term
  const filteredBranches = branchesData.filter(branch => 
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper
      title="Branches"
      filters={["search"]}
      placeholders={{ search: "Search by Branch name" }}
      addButtonLabel="Add Branch"
      onAddClick={() => navigate("/add-branch")}
      showAddButton={true}
      onSearch={handleSearch}
    >
      <div className="branches-container">
        {filteredBranches.map((branch) => (
          <div className="branch-card" key={branch.id}>
            <div className="branch-info">
              <h3>{branch.name}</h3>
              <div className="address-section">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="address-icon" />
                <span className="address-title">Address:</span>
                <p>{branch.address}</p>
              </div>
            </div>
            <div className="edit-icon-Branch" onClick={() => navigate(`/edit-branch/${branch.id}`)}>
              <FontAwesomeIcon icon={faEdit} />
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default BranchesPage;

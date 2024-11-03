import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./BranchesPage.css";
import axiosInstance from '../../server/axios.instance'

const BranchesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [branchesData,setBranchesData] = useState([])

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Filter branches based on the search term
  const filteredBranches = branchesData.filter(branch => 
    branch.BranchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/branches")
      setBranchesData(response.data)
    }
   
    fetchData()
  },[])

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
          <div className="branch-card" key={branch.BranchID}>
            <div className="branch-info">
              <h3>{branch.BranchName}</h3>
              <div className="address-section">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="address-icon" />
                <span className="address-title">Address:</span>
                <p>{branch.City}</p>
              </div>
            </div>
            <div className="edit-icon-Branch" onClick={() => navigate(`/edit-branch/${branch.BranchID}`)}>
              <FontAwesomeIcon icon={faEdit} />
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default BranchesPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./BranchesPage.css";
import axiosInstance from "../../server/axios.instance";
import Spinner from "../../components/Spinner/Spinner";

const BranchesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [branchesData, setBranchesData] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Filter branches based on the search term
  const filteredBranches = branchesData.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/branch");
      setBranchesData(response.data?.branches);
      setLoading(false)
    };

    fetchData();
  }, []);

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
        {loading ? <Spinner /> :filteredBranches?.map((branch) => (
          <div className="branch-card" key={branch?.id}>
            <div className="branch-info">
              <h3>{branch?.name}</h3>
              <div className="address-section">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="address-icon"
                />
                <span className="address-title">Address:</span>
                <p>{branch?.address?.city}</p>
              </div>
            </div>
            <div
              className="edit-icon-Branch"
              onClick={() => navigate(`/edit-branch/${branch?.id}`)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </div>
          </div>
        )) }
      </div>
    </PageWrapper>
  );
};

export default BranchesPage;

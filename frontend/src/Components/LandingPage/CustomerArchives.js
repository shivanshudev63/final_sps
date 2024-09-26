import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../../Pages/ArchiveData.css'; // Import the new CSS file
import logo from "../../Authentication/logo.png";
import {
  Dropdown,
} from "react-bootstrap";
import avatar from "../../Assets/avatar.png"; 
import "./LandingPage.css"; 
const CustomerArchiveTable = () => {
    const { customer_id } = useParams();
  const [archives, setArchives] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the archived data from the backend
    const fetchArchives = async () => {
      try {
        const response = await axios.get(`http://54.175.148.241:8081/archives/${customer_id}`);
        setArchives(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching archive data:", error);
      }
    };
    fetchArchives();
  }, [customer_id]);
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <>
     
    <div className="archive-container" style={{height: '100vh', justifyContent: 'start'}}>
      <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
      <h2 style={{ marginTop: '30px'}}>Service History</h2>
      <table className="archive-table">
        <thead>
          <tr>
            <th>Service Name</th>
            {/* <th>Customer Name</th> */}
            {/* <th>Service ID</th> */}
            <th >Plan Name</th>
            <th>Features</th>
            <th>Feedback</th>
            <th>Enrolled ON</th>
             
            <th>Terminated ON</th>
          </tr>
        </thead>
        <tbody style={{background: 'white'}}>
          {archives.length > 0 ? (
            archives.map((archive) => (
              <tr key={archive.id}>
                <td>{archive.Service.service_name}</td>
                {/* <td>{archive.customer_name}</td> */}
                {/* <td>{archive.service_id}</td> */}
                <td className={`plan-name ${archive.plan_name.toLowerCase()}`} style={{marginTop: '10px'}}>{archive.plan_name}</td>
                <td>{archive.features || "N/A"}</td>
                <td>{archive.feedback || "Not Available"}</td>
                <td>{new Date(archive.createdAt).toLocaleString()}</td>
                <td>{new Date(archive.updatedAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No archived services found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};
export default CustomerArchiveTable;
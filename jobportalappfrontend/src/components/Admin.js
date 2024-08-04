import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminScreen = () => {
  const history = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [inputValue, setInputValue] = useState("");
  const [outputData, setOutputData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const excludedHeaders = ['_id', '__v', 'applications'];
  const filteredHeaders = headers.filter(header => !excludedHeaders.includes(header));

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // localStorage.removeItem('authToken');
    // Navigate to the login page
    history("/");
  };
  const editdata = () => {

  }
  const deletedata = () => {

  }
  const handleChange = async (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
    console.log(inputValue);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "https://jobportalappbackend.vercel.app/" + e.target.value,
        requestOptions
      );
      const result = await response.json();
      setOutputData(result);
      setHeaders(Object.keys(result[0]));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <h1>Welcome, Admin {state.data.userName}</h1>
      <label htmlFor="roleType">Select Data to Display</label>&nbsp;&nbsp;
      <select id="data" name="data" value={inputValue} onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="users">Users</option>
        <option value="jobs">Jobs</option>
        <option value="jobapplicants">Job Applicants</option>
      </select>
      <br></br>
      <br></br>
      {outputData && (
        <div class="table-responsive">
        <table className="table">
          <thead>
            <tr>
                <th scope="col">SNo</th>
              {filteredHeaders.map((header) => (
                <th scope="col">{header.toUpperCase()}</th>
              ))}
              <th scope="col">EDIT ACTION</th>
              <th scope="col">DELETE ACTION</th>
            </tr>
          </thead>
          <tbody>
            {outputData.map((job, index) => (
              <tr key={job._id}>
                <th scope="row">{index + 1}</th>
                { filteredHeaders.map((header,index) => {
                        return (
                            <td>{job[header]}</td>
                        )
                    })
                }
                <td onClick={editdata}>Edit</td>
                <td onClick={deletedata}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminScreen;

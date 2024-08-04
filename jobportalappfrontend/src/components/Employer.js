import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EmployerScreen = () => {
  const history = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log(state.data,"data")
  const [outputData, setOutputData] = useState([]);
  const [stateData, setStateData] = useState({});
  // setStateData(state.data);
  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    localStorage.removeItem("authToken");
    // Navigate to the login page
    history("/");
  };

  const handleData = async () => {
    setStateData(state.data)
    console.log(stateData,"StateData")
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = fetch(
        "https://jobportalappbackend.vercel.app/jobs/"+stateData.companyName,
        requestOptions
      );
      console.log(response,"Resp")
      const result = (await response).json();
      setOutputData(result);
      // setHeaders(Object.keys(result[0]));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const editdata = () => {

  }
  const deletedata = () => {

  }

  return (
    <div>
      <h1>Welcome, Employer {state.data.userName}</h1>
      <button onClick={handleData}>Get Data</button>

      {outputData && (
        <div class="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">SNo</th>
                <th scope="col"></th>
                <th scope="col">EDIT ACTION</th>
                <th scope="col">DELETE ACTION</th>
              </tr>
            </thead>
            <tbody>
              {outputData.map((job, index) => (
                <tr key={job._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{job.title}</td>
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

export default EmployerScreen;

import { useState } from "react";
import "./App.css";
import homepage from "./homepage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    roleType: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const buttonType = e.nativeEvent.submitter.name;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(formData);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "https://jobportalappbackend.vercel.app/" + buttonType,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        toast.info(result, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      )
      .catch((error) => alert("error", error));
    console.log("Form Data:", formData);
    // setFormData({
    //   username: "",
    //   password: "",
    //   email: "",
    //   roleType: "",
    // });
  };

  return (
    <div className="App">
      <h1>JOB PORTAL</h1>
      <div className="row">
        <div className="col-lg-6">
          <img src={homepage} className="img-fluid" alt="Home Page"></img>
        </div>
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">UserName</label>
            <br></br>
            <br></br>
            <input
              type="text"
              id="username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter UserName"
            />
            <br></br>
            <br></br>
            <label htmlFor="password">Password</label>
            <br></br>
            <br></br>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            <br></br>
            <br></br>
            <label htmlFor="email">Email</label>
            <br></br>
            <br></br>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            <br></br>
            <br></br>
            <label htmlFor="roleType">Role Type</label>
            <br></br>
            <br></br>
            <select
              id="roleType"
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employer">Employer</option>
              <option value="jobseeker">Job Seeker</option>
            </select>
            <br></br>
            <br></br>
            <button type="submit" name="login">
              Login
            </button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit" name="register">
              Register
            </button>
          </form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}

export default App;

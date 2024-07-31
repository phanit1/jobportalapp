import { useState } from "react";
import "./App.css";

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
    fetch("https://jobportalappbackend.vercel.app/"+buttonType, requestOptions)
        .then((response) => response.text())
        .then((result) => alert(result))
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">UserName</label><br></br><br></br>
        <input
          type="text"
          id="username"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Enter UserName"
        /><br></br><br></br>
        <label htmlFor="password">Password</label><br></br><br></br>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
        /><br></br><br></br>
        <label htmlFor="email">Email</label><br></br><br></br>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
        /><br></br><br></br>
        <label htmlFor="roleType">Role Type</label><br></br><br></br>
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
        </select><br></br><br></br>
        <button type="submit" name="login">
          Login
        </button>
        <button type="submit" name="register">
          Register
        </button>
      </form>
    </div>
  );
}

export default App;

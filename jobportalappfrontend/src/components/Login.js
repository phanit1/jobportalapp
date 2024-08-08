import { useState } from "react";
import "./Login.css";
import homepage from "../homepage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const history = useNavigate();
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    password: "",
    email: "",
    roleType: "",
  });

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

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
    var raw = JSON.stringify(formData);
    var rawdata = JSON.parse(raw);
    if (buttonType === "register") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
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
        .then((result) => {
          if (result === "Successfully Loggedin") {
            localStorage.setItem(
              "userData",
              JSON.stringify({ data: formData })
            );
            login(formData.roleType);
            history("/" + formData.roleType, { state: { data: formData } });
          } else {
            toast.info(result, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((error) => alert("error", error));
      console.log("Form Data:", formData);
    } else {
      console.log(buttonType);
      console.log(raw, "raw data");
      var requestOptions1 = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://jobportalappbackend.vercel.app/users/" + formData.userName,
        requestOptions1
      )
        .then((response) => response.text())
        .then((result) => {
          let resultdata = JSON.parse(result)[0];
          if (
            resultdata.userName === rawdata.userName &&
            resultdata.password === rawdata.password
          ) {
            console.log(resultdata);
            localStorage.setItem(
              "userData",
              JSON.stringify({ data: resultdata })
            );
            login(resultdata.roleType);
            history("/" + resultdata.roleType, { state: { data: resultdata } });
          } else if (
            resultdata.userName === rawdata.userName &&
            resultdata.password !== rawdata.password
          ) {
            toast.info("Trying to Enter Wrong Credentials", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((error) => {
          toast.info("Getting Error. Please Check Credentials"+error, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
    // setFormData({
    //   username: "",
    //   password: "",
    //   email: "",
    //   roleType: "",
    // });
    // localStorage.setItem('authToken', response.data.token);
    // Navigate to the employer screen
    // history("/"+formData.roleType);
  };

  return (
    <div className="App">
      <h1>JOB PORTAL</h1>
      <br></br>
      <div className="row">
        <div className="col-lg-6">
          <img src={homepage} className="img-fluid" alt="Home Page"></img>
        </div>
        <br></br>
        <div className="col-lg-6">
          {!isRegistering ? (
            <div className="form-container">
              <p className="title">Welcome back</p>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="username"
                  name="userName"
                  className="input"
                  placeholder="UserName"
                  value={formData.userName}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button className="form-btn" name="login" type="submit">
                  Log in
                </button>
              </form>
              <p className="sign-up-label">
                Don't have an account?
                <span className="sign-up-link" onClick={handleToggleForm}>
                  Sign up
                </span>
              </p>
            </div>
          ) : (
            <div className="form-container">
              <p className="title">Welcome back</p>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="username"
                  name="userName"
                  className="input"
                  placeholder="UserName"
                  value={formData.userName}
                  onChange={handleChange}
                />
                  <input
                    type="text"
                    id="fullname"
                    name="fullName"
                    className="input"
                    placeholder="FullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <select
                  id="roleType"
                  className="input"
                  name="roleType"
                  value={formData.roleType}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="employer">Employer</option>
                  <option value="jobseeker">Job Seeker</option>
                </select>
                {/* <p className="page-link">
                <span className="page-link-label">Forgot Password?</span>
              </p> */}
                <button className="form-btn" name="register" type="submit">
                  Register
                </button>
              </form>
              <p className="sign-up-label">
                Having an account?
                <span className="sign-up-link" onClick={handleToggleForm}>
                  Login
                </span>
              </p>
            </div>
          )}
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

export default Login;

import "./App.css";
import "./components/Login";
import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import EmployerScreen from "./components/Employer";
import AdminScreen from "./components/Admin";
import JobSeekerScreen from "./components/JobSeeker";
import AuthProvider from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/UnAuthorized";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employer"
            element={
              <ProtectedRoute roles={["employer"]}>
                <EmployerScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["jobseeker"]}>
                <JobSeekerScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

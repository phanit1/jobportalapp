import "./App.css";
import "./components/Login";
import {React} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EmployerScreen from './components/Employer';
import AdminScreen from "./components/Admin";
import JobSeekerScreen from "./components/JobSeeker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employer" element={<EmployerScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/jobseeker" element={<JobSeekerScreen />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

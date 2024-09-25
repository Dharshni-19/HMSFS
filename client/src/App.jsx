import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import StudentPage from "./pages/StudentPage";
import AdminIssue from "./subpages/AdminIssue";
import AdminDetails from "./subpages/AdminDetails";
import AdminStatus from "./subpages/AdminStatus";
import StudentIssue from "./subpages/StudentIssue";
import StudentRoom from "./subpages/StudentRoom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/admin/details" element={<AdminDetails />} />
        <Route path="/admin/issues" element={<AdminIssue />} />
        <Route path="/admin/status" element={<AdminStatus />} />
        <Route path="/student/issues" element={<StudentIssue />} />
        <Route path="/student/room" element={<StudentRoom />} />
      </Routes>
    </Router>
  );
};

export default App;

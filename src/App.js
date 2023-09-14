import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import { LogIn } from "./components/Login";
import { Profile } from "./components/Profile";
import EmailVerify from "./components/EmailVerify";
import { UserDetailsDisplay } from "./components/UserDetailsDisplay";
import { ForgetPassword } from "./components/ForgetPassword";
import "./App.css";


const App = () => {
  return (
    <div className="App">
  <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/LogIn" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/EmailVerify" element={<EmailVerify />} />
        <Route path="/UserDetailsDisplay" element={<UserDetailsDisplay />} />
         <Route path="/ForgetPassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
    </div>
  
  );
};

export default App;


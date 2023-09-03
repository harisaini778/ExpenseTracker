import React from "react";
import LogIn from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


const App = () => {
  
  return (
     <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/LogIn" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/LogIn" element={<LogIn/>} />
          </Routes>
        </Router>
  )
}
export default App;

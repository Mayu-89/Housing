




import React from "react";
import './Navbar.css'; // Add custom CSS for Navbar
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <nav className="navbar" >
      <div className="navbar-content">
      <p className="registration-date">Registration Date: 18-02-2024</p>
        <h3 className="navbar-title">Housing Society</h3> 
        <p className="registration-no">Registration No:1</p>        
      </div>
    </nav>
  );
};

export default Navbar;

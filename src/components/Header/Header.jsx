import React from 'react';
import './Header.css';
import logo from '../../assets/images/header-logo.png';
import profileLogo from '../../assets/images/profile.png';
const Header = () => {
  return (
    <header>
     <img src={logo}alt="Your Company Logo" class="logo" />
      
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Class</a></li>
          <li><a href="#">MockTest</a></li>
          <li><a href="#">Notes</a></li>
          <li><a href="#">PYQ</a></li>
          <li><a href="#">Test Potal</a></li>
          <li><a href="#"><img src={profileLogo} alt="Profile Logo" className="profile-logo" /></a></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Header;

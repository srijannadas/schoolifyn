import React,{useState} from 'react';
import './Header.css';
import logo from '../../assets/images/header-logo.png';
import profileLogo from '../../assets/images/profile.png';
import { useAuth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { CgLogOff } from "react-icons/cg";


const Header = () => {
  const {token, handleLogout} = useAuth();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const user = token?jwtDecode(token):{'userName': 'Guest'}
  const handleLogoutClick = () => {
   handleLogout(); 
  }
  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };
  return (
    <header>
     <img src={logo}alt="Your Company Logo" class="logo" />
      
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          {
            token ? (
              <>
              <li><a href="#">Class</a></li>
              <li><a href="#">MockTest</a></li>
              <li><a href="#">Notes</a></li>
              <li><a href="#">PYQ</a></li>
              <li><a href="#">Test Potal</a></li>
              <li><a href="#">Dashboard</a></li>
              
              </>
            ) : (
              <>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              </>
              
            )
          }
         
          {
            token ? (
              <>
            <li className='profile'> <a className='d-flex' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> <FiUser className='me-2' /> Hi, {token ? user.userName : 'userName'} </a></li>
            {isDropdownVisible && (
              <div className="profile-dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <ul>
                      <li>
                        <Link to="/profile">Profile</Link>
                        
                      </li>
                      
                      {/* Add more links as needed */}
                    </ul>
                  </div>
                )}
                <li> <a href='#' onClick={handleLogoutClick}> <CgLogOff style={{fontSize: '18px'}}/> </a></li>

            </>
            )
             : (
              <>
              <Link to={'/login'}> <li><a href="#" className='btn btn-sm bg-[#095085] text-white hover:bg-[#095085] me-2'>Login</a></li></Link>
              <Link to={'/register'}> <li><a href="#" className='btn btn-sm bg-[#095085] text-white hover:bg-[#095085]'>Register</a></li> </Link>
              </>
            )
          }
          <li></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Header;

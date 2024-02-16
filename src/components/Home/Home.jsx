import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
const Home = ({ location }) => {
  const { token, handleLogout } = useAuth();

  const user = token ? jwtDecode(token) : { 'userName': 'Guest' }

  // if (!token) {
  //   return <div>Please log in to access this page.</div>;
  // }
  const handleLogoutClick = () => {
    handleLogout();
  }
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col">

            {/* <h2 className='text-2xl text-indigo-600'>Welcome, {token ? user.userName : 'Guest'}!</h2>
            <Link to={'/login'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded'>Login</button></Link>
            <Link to={'/register'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded'>Register</button></Link>
            <Link to={'#'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded' onClick={handleLogoutClick}>Logout</button></Link> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
const Home = ({ location }) => {
  const { state } = useAuth();
  return (
    <div>
      <Header/>
      <div className="container-fluid">
        <div className="row">
            <div className="col">
          
        <h2 className='text-2xl text-indigo-600'>Welcome, {localStorage.getItem('fullName')}!</h2>
           <Link to={'/login'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded'>Login</button></Link>
           <Link to={'/register'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded'>Register</button></Link>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home

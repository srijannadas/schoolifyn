import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { useAuth } from '../Context/AuthContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeroImage from '../../assets/images/home pic.png';
// import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import cardInfo from './CardInfo.json'
import NotesImg from '../../assets/images/notes.jpeg'
import './Home.css';
const Home = ({ location }) => {

  // if (!token) {
  //   return <div>Please log in to access this page.</div>;
  // }
  const subjects = [
    "Mathematics",
    "Science",
    "History",
    "English",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education"
  ];

  const renderCards = () => {
    return cardInfo.cards.map((card, index) => (
      <div key={index} className="col-md-3 mb-4">
      <div className={`card`} style={{backgroundColor: card.backgroundColor, color: card.textColor}}>
        <div className="card-body">
          <h5 className="card-title">{card.title} {index + 1}</h5>
          <p className="card-text">{card.subtitle}</p>
          <img src={NotesImg} alt="" className="card-img-top img-fluid"/>
        </div>
      </div>
      </div>
    ));
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 d-flex justify-center items-center flex-column">
            <h1 className='text-4xl font-bold text-[#47AE6A] drop-shadow'>One Place for
              <br /> all your Academics
              <br /> Help!!
            </h1>


            <button className=' align-left p-2 bg-[#0A5085] text-indigo-100 rounded mt-3'
              style={{ marginLeft: '-10.5rem ' }}>Explore  Now</button>


            {/* <h2 className='text-2xl text-indigo-600'>Welcome, {token ? user.userName : 'Guest'}!</h2>
            <Link to={'/login'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded'>Login</button></Link>
            <Link to={'/register'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded'>Register</button></Link>
            <Link to={'#'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded' onClick={handleLogoutClick}>Logout</button></Link> */}
          </div>
          <div className="col-md-6 ">
            <img src={HeroImage} alt="" width="400px" height="352px" />
          </div>
        </div>
      </div>


      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <h2 className="subjects-heading">Subjects</h2>
            <div className="subject-container">
              {subjects.map((subject, index) => (
                <div key={index} className="subject-box">
                  {subject}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  explore now ---- yaha ncrt and baki chiz add hoga */}

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <h2 className="material-heading">Study Materials</h2>
            <div className="row">
            
               
                    
                    {renderCards()}
               
                </div>
              </div>
            </div>
          </div>
        


      <Footer />
    </div>
  )
}

export default Home

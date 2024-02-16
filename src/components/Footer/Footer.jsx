import React from 'react';
import Wave from 'react-wavify';
import './Footer.css';
const Footer = () => {
  return (
    <div>
    <Wave fill='#0B5084'
    paused={true}
    style={{ display: 'flex' }}
    options={{
      height: 40,
      amplitude: 300,
      speed: 0.15,
      points: 2
    }}
/>
    <footer className=" bg-[#0B5084] py-12">
       

      <div className="container mx-auto">
        <div className="row">
          {/* About Us */}
          <div className="col-md-3">
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">la eu justotur sagittis vitae ut velit.</p>
          </div>
          
          {/* Quick Links */}
          <div className="col-md-3">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li><a href="#" className="hover:text-gray-200">Home</a></li>
              <li><a href="#" className="hover:text-gray-200">About</a></li>
              <li><a href="#" className="hover:text-gray-200">Services</a></li>
              <li><a href="#" className="hover:text-gray-200">Contact</a></li>
            </ul>
          </div>

           {/* Resources */}
           <div className="col-md-3">
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="text-gray-400">
              <li><a href="#" className="hover:text-gray-200">Resource 1</a></li>
              <li><a href="#" className="hover:text-gray-200">Resource 2</a></li>
              <li><a href="#" className="hover:text-gray-200">Resource 3</a></li>
              <li><a href="#" className="hover:text-gray-200">Resource 4</a></li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className="col-md-3">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-400">
              <li>Email: info@example.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Street, City</li>
            </ul>
          </div>
        </div>
        
        {/* Social Media */}
  
        <div className="flex justify-center items-center mt-8">
          <a href="#" className="text-gray-400 hover:text-white mx-4"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-400 hover:text-white mx-4"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-white mx-4"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-400 hover:text-white mx-4"><i className="fab fa-linkedin"></i></a>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-12">
          <p className="text-gray-400">© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
      
    </footer>
    </div>
  );
}

export default Footer;

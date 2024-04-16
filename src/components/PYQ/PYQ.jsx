import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PYQ = () => {
  return (
    <div>
      <Header />
      <div>
        <h1 className="text-5xl mt-2 text-center">Previous Year Question</h1>
        <div className="flex justify-center mt-4">
          {/* First Dropdown */}
          <select className="mx-2 px-4 py-2 border rounded">
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            {/* Add more options as needed */}
          </select>
          {/* Second Dropdown */}
          <select className="mx-2 px-4 py-2 border rounded">
            <option value="">Select Subject</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            {/* Add more options as needed */}
          </select>
          {/* Third Dropdown */}
          <select className="mx-2 px-4 py-2 border rounded">
            <option value="">Select Exam</option>
            <option value="SAT">SAT</option>
            <option value="ACT">ACT</option>
            {/* Add more options as needed */}
          </select>
        </div>
        
      </div>
      <div className="flex justify-center mt-4">
          {/* First Column */}
          <div className="flex flex-col items-center mx-4">
            {/* Box 1 */}
            <div className="bg-gray-200 w-64 h-64 flex flex-col justify-center items-center rounded-lg shadow-md mb-4">
              <span>Question Paper 1</span>
              <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Download</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View</button>
              </div>
            </div>
            {/* Add more boxes as needed */}
          </div>
          {/* Second Column */}
          <div className="flex flex-col items-center mx-4">
            {/* Box 2 */}
            <div className="bg-gray-200 w-64 h-64 flex flex-col justify-center items-center rounded-lg shadow-md mb-4">
              <span>Question Paper 2</span>
              <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Download</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View</button>
              </div>
            </div>
            {/* Add more boxes as needed */}
          </div>
          {/* Third Column */}
          <div className="flex flex-col items-center mx-4">
            {/* Box 3 */}
            <div className="bg-gray-200 w-64 h-64 flex flex-col justify-center items-center rounded-lg shadow-md mb-4">
              <span>Question Paper 3</span>
              <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Download</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View</button>
              </div>
            </div>
            {/* Add more boxes as needed */}
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default PYQ;

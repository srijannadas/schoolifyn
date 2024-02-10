import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
            <div className="col">
            <h1 className="text-2xl font-bold text-indigo-700">Schoolify</h1>
           <Link to={'/login'}> <button className='p-2 bg-indigo-500 text-indigo-100 rounded'>Login</button></Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home

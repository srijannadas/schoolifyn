import React,{useState} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { FaBookReader,FaUserEdit } from "react-icons/fa";
import { RiBookReadFill } from "react-icons/ri";
import { FaNoteSticky } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';



const Profile = () => {

    const [isProfileComplete, setProfileComplete] = useState(false);


    return (
        <>
            <Header />
            <main className='bg-gray-100'>
                <div className="container py-12 flex justify-between">
                    <div className="w-1/2">
                        <h1 className='text-xl font-bold'>Good Morning, User</h1>
                        <p className='text-gray-500'>Welcome to your Dashboard!</p>
                    </div>
                    <div class="w-1/2 flex justify-end">
                        <span className='font-bold p-2 rounded-lg bg-[#3facff] flex justify-center items-center text-white'>30 🪙</span>
                    </div>
                </div>

            {!isProfileComplete ? (

            <div className="container">
                <Link to={'./complete'}>
                <button className='p-2 rounded-md mb-4 bg-[#095085] text-white'>Complete Your Profile</button>
                </Link>
            </div>
            ):''}
                <div className="container p-0 bg-gray-200 rounded-md">
    <div className="flex">
        <div className="w-1/6 p-4 rounded-md bg-[#095085] text-white">
            <ul className="space-y-4 ">
                <li className="text-lg font-semibold">Menu</li>
                <hr />
                <li><a href="#" className="text-gray-200 hover:underline flex"><span className='me-2'><FaBookReader /> </span> Courses</a></li>
                <li><a href="#" className="text-gray-200 hover:underline flex"><span className='me-2'><RiBookReadFill /> </span> Assignments</a></li>
                <li><a href="#" className="text-gray-200 hover:underline flex"><span className='me-2'><FaNoteSticky /> </span> Notes</a></li>
                <li><a href="#" className="text-gray-200 hover:underline flex"><span className='me-2'><PiCertificateFill /> </span> Certifications</a></li>
            </ul>
            <hr className='mt-2'/>
            <ul className="space-y-4 ">
                <li className="text-lg font-semibold my-3">Profile</li>
                <hr className='-mt-2'/>
                <li><a href="#" className="text-gray-200 hover:underline flex"><span className='me-2'><FaUserEdit /> </span> Edit Profile</a></li>
                <li><a href="#" className="text-gray-200 hover:underline flex"><span className='me-2'><IoLogOut /> </span> Logout</a></li>
            </ul>
        </div>

        <div className="w-3/4 p-4">
            <p>Main content goes here...</p>
        </div>
    </div>
</div>

            </main>
            <Footer />
        </>
    )
}

export default Profile

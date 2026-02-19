import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

        const navigate = useNavigate();
        const [showMenu, setshowMenu] = useState(false);
        const [token, settoken] = useState(true);

  return (
    
    <div className='flex item-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>

      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="logo" />
      <ul className="hidden md:flex items-center gap-5 font-medium">
                <li className="py-2">
                  <NavLink to="/" className="no-underline relative py-2 no-underline
                                  after:content-[''] after:absolute after:left-0 after:-bottom-0
                                  after:h-[2px] after:w-full after:bg-primary
                                  after:scale-x-0 after:origin-center
                                  after:transition-transform after:duration-300
                                  hover:after:scale-x-100">Home</NavLink>
                </li>

                <li className="py-2">
                  <NavLink to="/doctors" className="no-underline relative py-2 no-underline
                                  after:content-[''] after:absolute after:left-0 after:-bottom-0
                                  after:h-[2px] after:w-full after:bg-primary
                                  after:scale-x-0 after:origin-center
                                  after:transition-transform after:duration-300
                                  hover:after:scale-x-100">All Doctors</NavLink>
                </li>

                <li className="py-2">
                  <NavLink to="/about" className="no-underline relative py-2 no-underline
                                  after:content-[''] after:absolute after:left-0 after:-bottom-0
                                  after:h-[2px] after:w-full after:bg-primary
                                  after:scale-x-0 after:origin-center
                                  after:transition-transform after:duration-300
                                  hover:after:scale-x-100">About</NavLink>
                </li>

                <li className="py-2">
                  <NavLink to="/contact" className="no-underline relative py-2 no-underline
                                  after:content-[''] after:absolute after:left-0 after:-bottom-0
                                  after:h-[2px] after:w-full after:bg-primary
                                  after:scale-x-0 after:origin-center
                                  after:transition-transform after:duration-300
                                  hover:after:scale-x-100">Contact</NavLink>
                </li>
        </ul>

      <div className='flex item-center gap-4'>

        {
          token?
              <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                <img className='w-2.5' src={assets.dropdown_icon} alt="" />

                <div className='absolute top-1 right-8 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-1 p-3'>
                    <p onClick={()=>{navigate('my-profile')}} className="px-2 py-1 rounded-md cursor-pointer 
                                  hover:bg-white hover:text-black 
                                  transition-colors duration-200">My Profile</p>
                    <p onClick={()=>{navigate('my-Appointment')}} className="px-2 py-1 rounded-md cursor-pointer 
                                  hover:bg-white hover:text-black 
                                  transition-colors duration-200">My Appointments</p>
                    <p onClick={()=>settoken(false)} className="px-2 py-1 rounded-md cursor-pointer 
                                  hover:bg-white hover:text-black 
                                  transition-colors duration-200">Log Out</p>
                  </div>
                </div>
              </div>
              
          :<button
                onClick={() => navigate('/login')}
                className="relative overflow-hidden group
                  bg-primary text-white
                  px-5 py-1 rounded-full font-light
                  border border-transparent
                  hidden md:block
                  transition-all duration-300
                  outline-none ring-0 shadow-none
                  hover:border-black"
              >
                {/* Sliding White Background */}
                <span
                  className="absolute inset-0 w-0 bg-white
                    transition-all duration-300 ease-in-out
                    group-hover:w-full"></span>
                {/* Text */}
                <span className="relative z-10
                    transition-colors duration-300
                    group-hover:text-black">
                  Create Account
                </span>
          </button>
         }
      </div>
    </div>
  )
}
export default Navbar

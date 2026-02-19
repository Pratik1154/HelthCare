import React from 'react'
import { assets } from '../assets/assets'
import SpecialityMenu from './SpecialityMenu';

const Header = () => {
  return (
<div className="bg-primary rounded-xl px-8  md:px-16 lg:px-24 pt-12">
      
      <div className="flex flex-col-reverse md:flex-row items-center">
        
        {/* LEFT SIDE */}
        <div className="md:w-1/2 text-white py-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Book Appointment <br /> With Trusted Doctors
          </h1>

          <div className="flex items-center gap-4 mt-6">
            <img src={assets.group_profiles} className="w-24" alt="" />

            <p className="text-sm opacity-90">
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </p>
          </div>

          <a
            href="#speciality"
            className="learn-btn mt-6">
                <span className="circle">
                <span className="icon arrow"></span>
                </span>
                <span className="button-text">Book appointment</span>
            {/* <img className="w-3" src={assets.arrow_icon} alt="" /> */}
          </a>
          
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 relative">
          <img
            src={assets.header_img}
            className="w-full md-absolute bottom-0  h-auto rounded-lg"
            alt=""
          />
        </div>

      </div>
    </div>
  );
};


export default Header

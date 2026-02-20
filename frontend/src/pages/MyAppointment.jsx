import React, { useContext } from 'react'
import {AppContext} from '../context/AppContex'

const MyAppointment = () => {

  const {doctors} = useContext(AppContext)

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div >
        {doctors.slice(0,2).map((item,index)=>(
          <div className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b hover:scale-101 hover:bg-indigo-100 duration-100' key={index}>
            <div>
              <img className='w-38  bg-indigo-200 rounded-r-full ' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-3'>Address: </p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p  className='text-xs mt-5' ><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 25, july, 2024 | 8.30 PM</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-40 py-2 mr-2 border rounded   transition-all duration-200 hover:bg-primary hover:text-white hover:scale-105'>Pay Online </button>
              <button className='text-sm text-stone-500 text-center sm:min-w-40 py-2 mr-2 border rounded   transition-all duration-200 hover:bg-red-600 hover:text-white hover:scale-105'>Cancle Appointment</button>
            </div>
          </div>
        ))}
      </div>  
    </div>
  )
}
export default MyAppointment

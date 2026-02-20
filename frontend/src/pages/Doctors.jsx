import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContex'
import { useEffect } from 'react'

const Doctors = () => {

  const {speciality} = useParams()
  const [filterDoc,setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const {doctors} = useContext(AppContext)
  const navigate = useNavigate()
  

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors,speciality])
  console.log(speciality)
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div  className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white':''}`} onClick={() => setShowFilter(prev => !prev)}>filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter? 'flex' : 'hidden sm:flex'}`}>
        <p onClick={()=>speciality==='General physician'? navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white hover:scale-105 ${speciality === 'General physician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>General physician</p>
        <p onClick={()=>speciality==='Gynecologist'? navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white hover:scale-105 ${speciality === 'Gynecologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gynecologist</p>
        <p onClick={()=>speciality==='Dermatologist'? navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white hover:scale-105 ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Dermatologist</p>
        <p onClick={()=>speciality==='Pediatricians'? navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white hover:scale-105 ${speciality === 'Pediatricians' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist'? navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white hover:scale-105 ${speciality === 'Neurologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Neurologist</p>
        <p onClick={()=>speciality==='Gastroenterologist'? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white hover:scale-105 ${speciality === 'Gastroenterologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gastroenterologist</p>
        </div>
        <div key={speciality} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto place-items-center"> 
          {
            filterDoc.map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:bg-blue-500 hover:text-white animate-[fadeIn_0.5s_ease]" key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                  <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full '></p><p>Available</p>
                    </div>
                    <p>{item.name}</p>
                  <p className='text-sm'>{item.speciality}</p>
               </div>
            </div>
           ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors

import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContex'
import { assets } from '../assets/assets'
import RelatedDoctors from '../component/RelatedDoctors'

const Appointment = () => {

      const {docId} = useParams()
      const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      const {doctors,currencySymbol} = useContext(AppContext)
      
      const [docInfo,setdocInfo] = useState(null)
      const [docSlots, setDocSlots] = useState([])
      const [slotIndex, setSlotIndex] = useState(0)
      const [slotTime, setSlotTime] = useState('')



      const fetchDocInfo = () => {
      const docInfo = doctors.find(doc => doc._id === docId)
      setdocInfo(docInfo)
    }

      const getAvailableSolts = () => {
        const allSlots = []
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(today)
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            const timeSlots = []
            while (currentDate < endTime) {
                const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            allSlots.push(timeSlots)
        }
        setDocSlots(allSlots)
    }
  useEffect(() => {
    fetchDocInfo()
  }, [docId, doctors])

  useEffect(() => {
            getAvailableSolts()
    }, [docInfo])

  return docInfo ? (
    <div>
      {/*  Doctor Detail */}
      <div className='flex flex-col sm:flex-row gap-4 animate-[fadeIn_0.5s_ease]'>
        <div>
           <img className='bg-primary  sm:max-w-72 rounded-lg animate-x-[fadeIn_0.5s_ease]' src={docInfo.image} alt={docInfo.name} />
        </div>
        <div className='flex-1 border border-gray-400 w-full rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {/* Doctor info : name, degree. experience  */}
            {docInfo.name} 
            <img className='w-5 ' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex item-center gap-2 text-sm mt-1 text-gray-600'>
             <p>{docInfo.degree} - {docInfo.speciality}</p> 
            <button className='py-0.5 px-2 border text-xs rounded-full hover:text-white  hover:bg-primary'>{docInfo.experience}</button>
          </div>
          {/* Doctor About  */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3' >About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
              <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.fees}</span> </p>
        </div>
      </div>
        {/* Booking slots */}
        <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
            <p >Booking slots</p>
            <div className='flex gap-3  items-center w-full overflow-x-auto mt-4 overflow-y-hidden '>
              {
                docSlots?.filter(item => item && item.length > 0).map((item,index)=>(
                    <div onClick={() => setSlotIndex(index)} key = {index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md active:scale-95 ${slotIndex === index? 'bg-primary text-white shadow-md' : 'border border-[#DDDDDD] hover:border-primary'}`}>
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))
              }
            </div>
              <div className='flex items-center gap-3 w-full overflow-x-scroll h-20 mt-4 time-slots'>
                    {(docSlots[slotIndex] ?? []).map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
                    ))}
            </div>
              <button className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
        </div> 
        <style>
        {`
          .time-slots::-webkit-scrollbar {
            display: none;
          }
          .time-slots {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}
        </style>
        {/* Listing Releated Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
          {/* <RelatedDoctors speciality={docInfo.speciality} docId={docId} />     */}
    </div>
  ) : (
    <div className='text-center text-gray-600 mt-16 px-4'>
      <p className='text-lg font-medium'>Doctor not found</p>
      <p className='mt-2 text-sm'>Please check the URL or choose a doctor from the list.</p>
      <button type='button' onClick={() => navigate('/doctors')} className='mt-4 text-primary font-medium hover:underline'>View all doctors</button>
    </div>
  )
}

export default Appointment


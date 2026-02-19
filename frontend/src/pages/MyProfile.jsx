import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image : assets.profile_pic,
    email : 'richardjameswap@gmail.com',
    phone : '+1  123 456 7890',
    address : {
      
    }

  })
  return (
    <div>
      
    </div>
  )
}

export default MyProfile

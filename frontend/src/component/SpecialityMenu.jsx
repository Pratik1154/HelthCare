import { specialityData } from '../assets/assets'
import { Link, Navigate } from 'react-router-dom'


const SpecialityMenu = () => {
  return (
    <div id="speciality" className="py-16 text-center">
      
      <h1 className="text-3xl font-semibold">Find by Speciality</h1>
      <p className="text-gray-500 mt-3 max-w-xl mx-auto">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 mt-10 max-w-3xl mx-auto  place-items-center">
      {specialityData.map((item, index) => (
    <Link
        onClick={()=>scrollTo(0,0)}
        key={index}
        to={`/doctors/${item.speciality}`}
        className="flex items-center  justify-center gap-2
                   h-23 w-56
                   px-4 py-2
                  rounded-2xl bg-gray-100
                  transition-all duration-300
                  hover:bg-primary hover:text-white hover:scale-105">
        <img src={item.image} className="w-14 h-14" />
        <p className="font-medium">{item.speciality}</p>
    </Link>

  ))}

</div>
    </div>
  )
}

export default SpecialityMenu

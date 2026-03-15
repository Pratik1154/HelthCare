import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'): '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])

    const [dashData, setDashData] = useState(false)

    const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').trim().replace(/\/$/, '')



    // Getting all Doctors data from Database using API
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    };

    // Getting all Appointments from Database using API
    const getAllAppointment = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

     // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointment()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                const normalizedDashData = {
                    ...data.dashData,
                    latestAppointments:
                        data.dashData?.latestAppointments ||
                        data.dashData?.latestAppointmentsL ||
                        []
                }
                setDashData(normalizedDashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        aToken, setAToken,
        backendUrl, doctors, appointments,
        getAllDoctors, getAllAppointment, changeAvailability,
        cancelAppointment,
        dashData,getDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider

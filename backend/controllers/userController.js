import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'


//  API TO REGISTER THE USER 

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email formate
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }
        //  validating password and their length 
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        // Hashing user password 

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API FOR USER LOGIN 

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// API to get user profile data

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

// API TO UPDATE USER PROFILE 

const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API TO BOOK APPOINTMENT 
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData || !docData.available) {
            return res.json({ success: false, message: "Doctor not available" })
        }

        // Ensure slots_booked is always an object
        let slots_booked = docData.slots_booked || {}

        // checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Doctor not available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = [slotTime]
        }

        const userData = await userModel.findById(userId).select('-password')

        // we don't need to store doctor's slots_booked snapshot inside appointment
        const doctorSnapshot = { ...docData.toObject() }
        delete doctorSnapshot.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: doctorSnapshot,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in doctor
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API TO GET USER APPOINTMENTS FOR FRONTEND
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API TO CANCEL APPOINTMENT AND RELEASE SLOT
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" })
        }

        // Verify appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        if (appointmentData.cancelled) {
            return res.json({ success: true, message: "Appointment already cancelled" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot 
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        if (doctorData) {
            let slots_booked = doctorData.slots_booked || {}

            if (slots_booked[slotDate]) {
                slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

                // optional: remove date key if empty
                if (slots_booked[slotDate].length === 0) {
                    delete slots_booked[slotDate]
                }
            }

            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        }

        res.json({ success: true, message: "Appointment cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const razorpayInstance = new razorpay({
    key_id: process.env.RAZOR_PAY_KEYID,
    key_secret: process.env.RAZOR_PAY_KEYSECRET,
})
// API FOR RAZOR PAY

const paymentRazorpay = async (req, res) => {

    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment cancelled or not found" })
        }

        // CREATING OPTION FOR RAZORPAY
        const option = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // CREATION OF ORDER 
        const order = await razorpayInstance.orders.create(option)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API TO VERIFY RAZORPAY PAYMENT 

const verifyPayment  = async(req, res) =>{

    try {

        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        
        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true, message:'Payment Successful'})
        }else{
            res.json({success:false, message:'Payment failed'})
        }       
    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
        
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyPayment }

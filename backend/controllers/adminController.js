import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import jwt from "jsonwebtoken"

// Api for adding doctor 
const addDoctor = async (req, res) => {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address, imageUrl } = req.body
        const imageFile = req.file

        // checking for required data to add doctors
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({success:false,message:"Missing Detail: one or more required fields are empty"})
        }

        // validating email formate 

        if(!validator.isEmail(email)){
           return res.json({success:false,message:"Please enter a valid email"})
        }

        //validating strong password 

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        // hashing doctor password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // image to upload to cloudinary. Accept either an uploaded file (`req.file`) or an `imageUrl` in the body.
        let finalImageUrl = imageUrl
        if(!finalImageUrl && imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
            finalImageUrl = imageUpload.secure_url
        }

        const doctorData = {
            name,
            email,
            image: finalImageUrl || null,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            // accept address as JSON string or object
            address: typeof address === 'string' ? JSON.parse(address) : address,
            date:Date.now()
        }
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})
     }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addDoctor, loginAdmin}

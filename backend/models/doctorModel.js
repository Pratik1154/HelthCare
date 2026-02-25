import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    passwod:{type:String, required:true},
    image:{type:String, required:true},
    speciality:{type:String, required:true},
    degree:{type:String, required:true},
    experience:{type:String, required:true},
    about:{type:String, required:true},
    available:{type:Boolean, required:true},
    fee:{type:Number, required:true},
    address:{type:object, required:true},
    date:{type:Number, required:true},
    slot_booked:{type:object, default:{}},
},{minimize:false})


const doctorModel = mongoose.model.doctor || mongoose.model('doctor',doctorSchema)

export default doctorModel
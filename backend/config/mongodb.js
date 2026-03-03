import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', ()=>console.log('Database Connected'))
        const uri = process.env.MONGODB_URL
        if(!uri){
            throw new Error('MONGODB_URL not set in environment')
        }
        const dbName = 'preceptro'
        await mongoose.connect(uri, { dbName })
    }catch(error){
        console.error('Failed to connect to MongoDB:', error.message)
        process.exit(1)
    }
}

export default connectDB
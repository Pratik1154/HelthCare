import express from 'express'
import cors from 'cors'
import "dotenv/config" 

// app config

const app = express()
const port = process.env.PORT || 4000

// Middleware

app.use(express.json())
app.use(cors())

// api end point
app.get('/',(req,res)=>{
    res.send('APO working')
})

app.listen(port,()=>console.log('Server started',port))

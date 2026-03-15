import jwt from "jsonwebtoken"
// user authentication middleware

const authUser = (req, res, next) => {
    try{
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Unauthorized Access"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        if(!token_decode?.id){
            return res.json({success:false,message:"Unauthorized Access"})
        }

        req.body = req.body || {}
        req.body.userId = token_decode.id
        req.userId = token_decode.id
        next()
     }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authUser

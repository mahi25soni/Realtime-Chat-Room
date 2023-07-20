const jwt = require("jsonwebtoken")
require('dotenv').config()


const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization
    // const token = req.cookies["login_token"]
    console.log(req.headers.authorization)

    if(!token){
        return res.status(401).json({message : "No token provided"})
    }
    jwt.verify(token, process.env.JSON_SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(401).send("Invalid Token")
        }
        else{
            req.user = decoded
            console.log("ye token wala hai ", req.user)
            next()
        }
    })
}

module.exports = {verifyAdmin} // Isko harr baar curly brackets mei bhejna pdta hia, without this it show error like "Router.get require function but got a object"
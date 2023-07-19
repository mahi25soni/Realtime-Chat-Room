const {user} = require("../../models/models")
const { hash , compare} = require("bcrypt")
const jwt  = require("jsonwebtoken")
const cookieParser = require("cookie-parser")



const  registerPage = (req, res) => {
    res.send("Register ka get")
}

const register = async (req, res, next) => {
    try{    
    req.body.password = await hash(req.body.password, 10)
    const newuser = new user(req.body)
    await newuser.save()   
    res.send(newuser)
    }
    catch(e){
        next(e)
    }
}

const loginPage = (req, res) => {
    res.send("Register ka get")
}

const login = async (req, res) => {
    const user = await user.findOne({"email" : req.body.email}).exec() // FindOne return a object, find returns a list
        if(!user){
            return res.status(404).send("No Such user exists")
        }
        else {
            const comparePass = await compare(req.body.password, user.password)
            if(!comparePass){
                return res.status(401).send("Password does not matches")
            }
            jwt.sign({role:"user", userId : user.id, email : user.email},
            "usersecretpower", (err, token)=> {
                if(err) {
                    return res.send(err)
                }
                else{
                    req.headers.authorization = token
                    res.cookie("login_token" , token)
                    return res.send(token)


                }

            })
        
    }
}


const viewAll = async (req, res, next) => {
    try{

        const all_data = await user.find().exec()
        res.send(all_data)
    }
    catch(e) {
        next(e)
    }
}
module.exports = {
    registerPage,
    register,
    loginPage,
    login,
    viewAll
}
const express = require("express") 
const router = express.Router()
const { body } = require("express-validator")
// const { verifyAdmin } = require("N:/Coding/NodeJs/Student Management System/middlewares/tokenAuth")

const { register,  login, viewAll}= require("./user.controller")
const { handleVerification } = require("../../middlewares/verificationError") 


router.route("/").get(viewAll)

router.route("/register").post(register,  handleVerification)

router.route("/login")
    .post(login)

module.exports =router
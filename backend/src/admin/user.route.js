const express = require("express")
const router = express.Router()
// const { verifyAdmin } = require("N:/Coding/NodeJs/Student Management System/middlewares/tokenAuth")

const { registerPage, register, loginPage, login, viewAll}= require("./user.controller")
// const { handleVerification } = require("../../middlewares/verificationError") 

router.route("/").get(viewAll)

router.route("/register").get(registerPage).post(register)

router.route("/login")
    .get( loginPage)
    .post(login)

module.exports =router
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : [true , "Enter your email address"]
    },
    phone_number : {
        type : String,
        required : [true , "Enter your phone number"]
    },
    password : {
        type : String,
        required : [true, "Enter you password"]
    }
})

const user = new mongoose.model("user", userSchema)

module.exports = {
    user
}
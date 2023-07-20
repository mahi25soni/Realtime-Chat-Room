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
    },
    chatrooms : [{
        type : mongoose.Types.ObjectId,
        ref : 'chatRoom'
    }],
})
const user = new mongoose.model("user", userSchema)

const chatRoomSchema = new mongoose.Schema({
    name : {
        type : String
    },
    users : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'user'
        }
    ],
    chats : [
        {
            type : mongoose.Types.ObjectId,
            ref : "chatRoomMessage"
        }
    ]
},
{
    timestamps : true
})
const chatRoom = new mongoose.model("chatRoom", chatRoomSchema)


const chatRoomMessageSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    chatroom_id : {
        type : mongoose.Types.ObjectId,
        ref : "chatRoom"
    },
    message : {
        type : String
    }
},
{
    timestamps : true
})
const chatRoomMessage = new mongoose.model("chatRoomMessage", chatRoomMessageSchema)


module.exports = {
    user,
    chatRoom,
    chatRoomMessage
}
 const { chatRoom , chatRoomMessage, user} = require("../../models/models")


 const add_chatroom = async (req, res) => {
    const new_chatroom = new chatRoom(req.body)
    await new_chatroom.save()
    res.send(new_chatroom)
 }

 const all_chatrooms = async (req, res) => {
   const all_chatroom = await chatRoom.find({}).exec()
   res.send(all_chatroom)
 }

 const chatrooms_per_user = async (req, res) => {
   const nothing = await user.findOne({"_id":req.user.userId}).populate("chatrooms").exec()
   res.send(nothing.chatrooms)
 }

 const add_user_chatroom = async (req, res) => {
    const required_user = await user.findByIdAndUpdate(req.user.userId, {"$push" : {"chatrooms" : req.body.chatroom_id}}, { new: true }).exec()
    const add_user_array = await chatRoom.findByIdAndUpdate(req.body.chatroom_id, {"$push": {"users" : required_user._id}}, { new: true }).exec()

    res.json(add_user_array)
 }

 const get_all_users_chatroom = async (req, res) => {
    const room = await chatRoom.findOne({_id : req.params.chatroom_id}).populate("users").exec()
    res.send(room.users)
 }


 const send_message = async (req, res) => {
    const new_message = new chatRoomMessage({
        user_id : req.user.userId,
        chatroom_id : req.params.chatroom_id,
        message : req.body.message
    })
    await new_message.save()

    const add_message_array = await chatRoom.findByIdAndUpdate(req.params.chatroom_id, {"$push" : {"chats" : new_message}}, {new : true}).exec()
    res.send(add_message_array)

 }


 module.exports = {
    add_chatroom,
    add_user_chatroom,
    send_message,
    all_chatrooms,
    chatrooms_per_user,
    get_all_users_chatroom
 }
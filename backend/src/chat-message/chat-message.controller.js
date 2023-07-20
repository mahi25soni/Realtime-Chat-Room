 const { chatRoom , chatRoomMessage, user} = require("../../models/models")


 const add_chatroom = async (req, res) => {
    const new_chatroom = new chatRoom(req.body)
    await new_chatroom.save()
    res.send(new_chatroom)
 }


 const add_user_chatroom = async (req, res) => {
    const required_user = await user.findByIdAndUpdate(req.user.userId, {"$push" : {"chatrooms" : req.body.chatroom_id}}, { new: true }).exec()
    const add_user_array = await chatRoom.findByIdAndUpdate(req.body.chatroom_id, {"$push": {"users" : required_user._id}}, { new: true }).exec()

    res.json({"user ka pov":required_user, "list":add_user_array})
 }

 const get_all_users_chatroom = async (req, res) => {
    const users = await chatRoom.find({_id : req.params.id}).exec()
    res.send(users)
 }


 const send_message = (req, res) => {
    
 }


 module.exports = {
    add_chatroom,
    add_user_chatroom,
    send_message,
    get_all_users_chatroom
 }
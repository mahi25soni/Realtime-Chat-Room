const express = require("express")
const router = express.Router()
const { add_chatroom , all_chatrooms , chatrooms_per_user ,add_user_chatroom, send_message, get_all_users_chatroom} = require("../chat-message/chat-message.controller")
const { verifyAdmin } = require("../../middlewares/tokenAuth")

router.route("/").get(all_chatrooms)
router.route("/create_chatroom").post(add_chatroom)
router.route("/user").post(verifyAdmin, add_user_chatroom)
router.route("/user/:chatroom_id").get(get_all_users_chatroom)
router.route("/user/chatrooms").get(verifyAdmin, chatrooms_per_user)
router.route("/message/:chatroom_id").post(verifyAdmin,send_message)

module.exports = router
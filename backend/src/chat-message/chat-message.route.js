const express = require("express")
const router = express.Router()
const { add_chatroom  ,add_user_chatroom, send_message, get_all_users_chatroom} = require("../chat-message/chat-message.controller")
const { verifyAdmin } = require("../../middlewares/tokenAuth")

router.route("/create_chatroom").post(add_chatroom)
router.route("/user").post(verifyAdmin, add_user_chatroom)
router.route("/user/:id").get(get_all_users_chatroom)
router.route("/message").post(send_message)

module.exports = router
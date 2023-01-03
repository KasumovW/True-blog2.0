const mongoose = require("mongoose")
const moment = require("moment")

const user = mongoose.Schema({
    login: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        default: "user"
    },
    avatar: {
        type: String,
        default: "/uploads/avatar_plug.svg"
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    createdAt: {
        type: String,
        default: moment().format("DD.MM.YYYY")
    },
    likes: [],
    comments: []
})

const User = mongoose.model("User", user);

module.exports = User
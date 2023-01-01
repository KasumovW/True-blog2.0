const mongoose = require("mongoose")

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
    likes: [],
    comments: []
})

const User = mongoose.model("User", user);

module.exports = User
const mongoose = require("mongoose")
const moment = require("moment")

const post = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: {
        type: String,
        default: moment().format("DD.MM.YYYY")
    },
    comments: [{
        userID: mongoose.Schema.Types.ObjectId ,
        text: String,
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    }]
})

const Post = mongoose.model("Post", post);

module.exports = Post
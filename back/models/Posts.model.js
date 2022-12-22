const mongoose = require("mongoose")

const post = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    category: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    }],
    userID: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    likes: {}
})

const Post = mongoose.model("Post", post);

module.exports = Post
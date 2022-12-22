const mongoose = require("mongoose")

const post = mongoose.Schema({
    theme: String,
    text: String,
    category: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    }],
    userID: {
        // required: true,
        // ref: "User"
    },
    likes: {}
})

const Post = mongoose.model("Post", post);

module.exports = Post
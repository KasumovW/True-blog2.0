const mongoose = require("mongoose")

const user = mongoose.Schema({
    login: {
        required: true,
        type: String
    },
    email: {
      type: String,
      unique: true,
    },
    // isActivated: {
    //   type: Boolean,
    //   default: false,
    // },
    // activationLink: {
    //     type: String,
    // },
    password: {
        required: true,
        type: String
    },
    role: {
      required: true,
      type: String,
      default: "user"
    },
    posts: [{
        // type: mongoose.SchemaTypes.ObjectId,
        // ref: "Post"
    }],
    likes: [],
    comments: [],
})

const User = mongoose.model("User", user);

module.exports = User
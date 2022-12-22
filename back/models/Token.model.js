const mongoose = require("mongoose")

const token = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    refreshToken: {type: String, required: true}
})

const User = mongoose.model("Token", token);

module.exports = User
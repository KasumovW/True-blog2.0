const User = require("../models/Users.model")

module.exports.userController = {
    registration: async (req, res) => {
        try {
            await User.create({login: req.body.login, password: req.body.password})
        } catch (e) {
            res.json(e)
        }
    },

    login: async (req, res) => {
        try {

        } catch (e) {
            res.json(e)
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await  User.find()

            res.json(users)
        } catch (e) {
            res.json(e)
        }
    }
}
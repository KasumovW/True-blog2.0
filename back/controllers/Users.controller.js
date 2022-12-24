const User = require("../models/Users.model")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

const generateAccessToken = (id, login, role) => {
    const payload = {
        id,
        login,
        role
    }

    return jwt.sign(payload, process.env.SECRET_JWT_KEY, {expiresIn: "24h"})
}

module.exports.userController = {
    registration: async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json(errors)
            }

            const {login, password, role} = req.body

            const candidate = await User.findOne({login})

            if(candidate) {
                return {status: 400, message: "Данный логин уже занят, попробуйте другой"}
            }

            const hashedPassword = await bcrypt.hashSync(password, 7)

            const user = await User.create({login, password: hashedPassword, role})
            res.status(200).json(user)
        } catch (e) {
            res.json(e)
        }
    },

    login: async (req, res) => {
        try {

            const { login, password } = req.body

            const user = await User.findOne({login})

            if(!user) {
                return res.status(400).json("Пользователь с таким логином не найден")
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if(!validPassword) {
                return res.status(400).json("Неправильный пароль")
            }

            const token = generateAccessToken(user._id, user.login, user.role)

            res.json({token})
        } catch (e) {
            res.json(e)
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.find()

            res.json(users)
        } catch (e) {
            res.json(e)
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id)

            res.json("User was deleted")
        }
        catch (e) {
            res.json(e)
        }
    }
}
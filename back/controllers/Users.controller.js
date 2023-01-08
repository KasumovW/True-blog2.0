const User = require("../models/Users.model");
const Post = require("../models/Posts.model")
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id, login, role, avatar) => {
    const payload = {
        id,
        login,
        role,
        avatar
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

            const token = generateAccessToken(user._id, user.login, user.role, user.avatar)
            //const {login, role, posts, likes, comments, avatar} = user

            res.json({token,id: user._id, login: user.login, role: user.role, posts: user.posts, likes: user.likes, comments: user.comments, avatar: user.avatar})
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

    getUserById: async (req, res) => { 
        try {
            const { id } = req.params
            const user = await User.findById(id).populate("posts").exec()

            res.json({login: user.login, role: user.role, posts: user.posts, likes: user.likes, avatar: user.avatar, createdAt: user.createdAt
            })
        } catch(e) {
            res.json(e)
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndRemove(req.params.id)

            res.json("User was deleted")
        }
        catch (e) {
            res.json(e)
        }
    },

    changeAvatar: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: {avatar: req.file.path}})

            if(!user) {
                return res.status(400).json({message: "Пользователь не найден"})
            }

            if(user._id !== req.params.id) {
                return res.status(400).json({message: "У вас недостаточно прав"})
            }

            res.json("Фото профиля было успешно изменено")
        }
        catch (e) {
            res.json("Не удалось изменить фото профиля")
        }
    },

    commentPost: async (req, res) => {
        try{
            const post = await Post.findById
            const user = await Post.findById

            if(!post) {
                return res.status(404).json({message: "Пост не был найден"})
            } else if (!user) {
                return res.status(404).json({message: "Не удалось найти пользователя"})
            }

            Post.findByIdAndUpdate(req.params.id, {$push: { comments: {userID: req.user.id, text: req.body.text}}})
            User.findByIdAndUpdate(req.user.id, {$push: { comments: {userID: req.user.id, text: req.body.text}}})

            res.status(200).json({message: "Комментарий успешно добавлен"})
        }
        catch (e) {
            res.status(400).json({message: "Не удалось добавить комментарий"})
        }
    },

    likePost: async (req, res) => {
        try{
            const post = await Post.findByIdAndUpdate(req.params.id, {$push: { likes: req.user.id }})
            const user = await User.findByIdAndUpdate(req.user.id, {$push: { likes: req.params.id }})

            if(!post) {
                return res.status(404).json({message: "Пост не был найден"})
            } else if (!user) {
                return res.status(404).json({message: "Не удалось добавить в понравившиеся"})
            }

            res.status(200).json({message: "Добавлено в понравившиеся"})
        }
        catch (e) {
            res.status(400).json({message: "Не удалось лайкнуть пост"})
        }
    }
}
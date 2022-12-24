const Post = require("../models/Posts.model")
const User = require("../models/Users.model")

module.exports.postController = {
    addPost: async (req, res) => {

        const {title, text} = req.body

        try {
            await Post.create({
                title,
                text,
                userID: req.user.id,
                image: req.file.path
            })

            res.status(200).json({message: "Пост успешно добавлен"})
        } catch (e) {
            res.json(e)
        }
    },

    getPosts: async (req, res) => {
        try {
            const posts = await Post.find()

            res.status(200).json(posts)
        } catch (e) {
            res.json(e)
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params

            const post = await Post.findById(id)

            console.log(post.userID, req.user.id)

            if(post.userID.toString() !== req.user.id) {
                return res.status(400).json({error: "Это не твоя статья, руки прочь!"})
            }

            post.remove()

            res.status(200).json({message: "Пост успешно удален"})
        } catch (e) {
            res.json(e)
        }
    },

    changePost: async (req, res) => {
        try {
            const { id } = req.params

            const post = await Post.findById(id)

            if(post.userID.toString() !== req.user.id || req.user.role !== "admin") {
                return res.json({error: "Это не твоя статья, руки прочь!"})
            }

            await Post.findByIdAndUpdate(id, {$set: {title: req.body.title, text: req.body.text, image: req.file.path}})

            res.status(200).json({message: "Пост был успешно изменен"})
        } catch (e) {
            res.json(e)
        }
    }
}
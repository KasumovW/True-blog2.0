const Post = require("../models/Posts.model")
const User = require("../models/Users.model")

module.exports.postController = {
    addPost: async (req, res) => {

        const {title, text} = req.body

        try {

            const post = await Post.create({
                    title,
                    text,
                    user: req.user.id,
                    image: req.file ? req.file.path : null
                })

            await User.findByIdAndUpdate(req.user.id, {$push: {posts: post._id}})

            return res.json("Успешно добавлен")
        } catch (e) {
            res.json(e)
        }
    },

    getPosts: async (req, res) => {
        try {
            const posts = await Post.find().populate("user").exec()

            res.status(200).json(posts)
        } catch (e) {
            res.json(e)
        }
    },

    getOne: async (req, res) => {
        try {
            const {id} = req.params
            const post = Post.findById(id).populate("user").exec()

            res.json(post)
        } catch (error) {
            res.json(error)
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

            await User.findByIdAndUpdate(req.user.id, {$pull: { posts: post._id}})

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
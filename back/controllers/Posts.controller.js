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
            res.json({message: "Не удалось добавить пост", error: e})
        }
    },

    getPosts: async (req, res) => {
        try {
            const { limit, skip } = req.query
            const posts = await Post.find({}).skip(skip).limit(limit).populate("user").exec()

            res.status(200).json(posts.reverse())
        } catch (e) {
            res.json({message: "Не удалось получить посты", error: e})
        }
    },

    getPostById: async (req, res) => {
        try {
            const {id} = req.params
            const post = await Post.findById(id).populate("user").exec()

            res.json(post)
        } catch (e) {
            res.json({message: "Не удалось получить пост", error: e})
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params

            const post = await Post.findById(id)

            if(post.user._id.toString() !== req.user.id) {
                return res.status(400).json({error: "Это не твоя статья, руки прочь!"})
            }

            await User.findByIdAndUpdate(req.user.id, {$pull: { posts: post._id}})
            await User.find({$pull: { likes: post._id}})

            post.remove()

            res.status(200).json({message: "Пост успешно удален"})
        } catch (e) {
            res.json({message: "Не удалось удалить пост", error: e})
        }
    },

    changePost: async (req, res) => {
        try {
            const { id } = req.params

            const post = await Post.findById(id)

            console.log(post.user._id.toString() === req.user.id.toString())

            if(post.user._id.toString() !== req.user.id.toString()) {
                return res.json({error: "Это не твоя статья, руки прочь!"})
            }

            const {title, text} = req.body

            await Post.findByIdAndUpdate(id, {$set: {title: title, text: text, image: req.file && req.file.path}})

            res.status(200).json({message: "Пост был успешно изменен"})
        } catch (e) {
            res.json({message: "Не удалось изменить пост", error: e})
        }
    }
}
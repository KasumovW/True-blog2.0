const Post = require("../models/Posts.model")

module.exports.postController = {
    addPost: async (req, res) => {

        const {theme, text, category} = req.body

        try {
            await Post.create({
                theme: theme,
                text: text,
                category: category,
                userID: req.user.id
            })
        } catch (e) {
            res.json(e)
        }
    },

    getPosts: async (req, res) => {
        try {
            const posts = await Post.find()

            res.json(posts)
        } catch (e) {
            res.json(e)
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params

            const post = await Post.findById(id)

            if(post.user.toString() !== req.user.id && req.user.role !== "moderator" || "admin") {
                return res.json({error: "Это не твоя статья, руки прочь!"})
            }

            post.remove()
        } catch (e) {
            res.json(e)
        }
    },

    changePost: async (req, res) => {
        try {
            const { id } = req.params

            const post = await Post.findById(id)

            if(post.userID.toString() !== req.user.id && req.user.role !== "admin") {
                return res.json({error: "Это не твоя статья, руки прочь!"})
            }

            Post.findByIdAndUpdate(id, {$set: {theme: req.body.theme, text: req.body.text}})
        } catch (e) {
            res.json(e)
        }
    }
}
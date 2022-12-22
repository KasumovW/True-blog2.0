const { Router } = require("express")
const { postController } = require("../controllers/Posts.controller")

const router = Router()

router.get("/posts", postController.getPosts)
router.post("/posts", postController.addPost)
router.post("/posts", postController.deletePost)
router.post("/posts", postController.changePost)

module.exports = router
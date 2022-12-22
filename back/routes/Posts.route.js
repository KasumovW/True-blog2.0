const { Router } = require("express")
const { postController } = require("../controllers/Posts.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = Router()

router.get("/posts", postController.getPosts)
router.post("/posts", authMiddleware, postController.addPost)
router.delete("/posts/:id", authMiddleware, postController.deletePost)
router.patch("/posts/:id", authMiddleware, postController.changePost)

module.exports = router
const { Router } = require("express")
const { postController } = require("../controllers/Posts.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../middlewares/upload")

const router = Router()

router.get("/posts", postController.getPosts)
router.post("/posts", authMiddleware, upload.single("image"), postController.addPost)
router.delete("/posts/:id", authMiddleware, postController.deletePost)
router.patch("/posts/:id", authMiddleware, upload.single("image"),postController.changePost)

module.exports = router
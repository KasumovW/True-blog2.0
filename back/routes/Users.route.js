const { Router } = require("express")
const { userController } = require("../controllers/Users.controller")
const { check } = require("express-validator")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../middlewares/upload")

const router = Router()

router.get("/users", userController.getUsers)
router.get("/users/:id", userController.getUserById)
// router.delete("/users/:id", userController.deleteUser)
router.post("/users/registration", [
    check("login", "Логин не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть не меньше 4 и не больше 12 символов").isLength({min: 4, max: 12})
], userController.registration)
router.post("/users/login", userController.login)
router.patch("/users/:id", authMiddleware, upload.single("avatar"), userController.editUser)
router.patch("/users/like/:id", authMiddleware, userController.likePost)
router.patch("/users/unlike/:id", authMiddleware, userController.unlikePost)
router.post("/users/comment/:id", authMiddleware, userController.commentPost)
router.delete("/users/:id", userController.deleteUser)

module.exports = router
const { Router } = require("express")
const { userController } = require("../controllers/Users.controller")
const { check } = require("express-validator")

const router = Router()

router.get("/users", userController.getUsers)
// router.delete("/users/:id", userController.deleteUser)
router.post("/users/registration", [
    check("login", "Логин не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть не меньше 4 и не больше 12 символов").isLength({min: 4, max: 12})
], userController.registration)
router.post("/users/login", userController.login)

module.exports = router
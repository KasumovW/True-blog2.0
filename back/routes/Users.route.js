const { Router } = require("express")
const { userController } = require("../controllers/Users.controller")

const router = Router()

router.get("/users", userController.getUsers)
router.post("/users", userController.registration)

module.exports = router
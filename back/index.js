require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(require("./routes/Users.route.js"))
app.use(require("./routes/Posts.route.js"))
app.use("/uploads", express.static("uploads"))

const start = async () => {
    await mongoose.connect("mongodb+srv://trueBlog:nicePasswordOK@cluster0.xnj3lfh.mongodb.net/?retryWrites=true&w=majority")
    console.log("подключился к MongoDB")
    app.listen(PORT, () => {
        console.log(`Сервер успешно запущен на порте ${PORT}`)
    })
}

start()
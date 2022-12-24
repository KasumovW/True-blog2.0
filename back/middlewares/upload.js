const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/")
    },

    filename() {
        const date = moment().format("DDMMYYYY-HHmmss_SSS")

        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimeType === "image/png" || file.mimeType === "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits,
})
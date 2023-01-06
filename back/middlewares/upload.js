const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype = 'image/png' || 'image/jpg' || 'image/jpeg'
    ){
      callback(null, true)
    }else {
      console.log('only png & jpg files are can be uploaded')
      callback(null, false)
    }
  },
  limits: 1024 * 1024 * 2
}
)

module.exports = upload
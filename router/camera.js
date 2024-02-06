const fs = require('fs');
const cameraRouter = require('express').Router();
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log(file)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

cameraRouter.get('/', async function (req, res) {
    res.send('camera ready...');
})

cameraRouter.post('/save', upload.single('image'), function (req, res) {
  res.send('성공')
})

module.exports = cameraRouter;



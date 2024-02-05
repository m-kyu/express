const fs = require('fs');
const cameraRouter = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
//upload.single('image')

cameraRouter.get('/', async function (req, res) {
    res.send('camera ready...');
})

cameraRouter.post('/save', upload.single('image'), function (req, res) {
  res.send('성공')
})

module.exports = cameraRouter;




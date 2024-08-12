const express = require('express')
const multer = require('multer');
const router = express.Router()
const {dataUpload} = require('../Controller/dataUpload')

const upload = multer({ dest: 'uploads' });

router.post('/upload',upload.single('file'), dataUpload)


module.exports = router;
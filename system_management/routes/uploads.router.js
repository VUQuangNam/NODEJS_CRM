const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middlewares/auth.middlewares');

const Upload = require('../models/upload.model')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image.jpeg' || file.mimetype === 'image.png') {
        cb(null, false);
    } else {
        cb(null, true);
    }
}

const upload = multer({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

router.post('/fileUpload', checkAuth, upload.single('image'), (req, res, next) => {
    const upload = new Upload({
        _id: mongoose.Types.ObjectId(),
        img: req.file.filename,
        create_by: {
            id: req.userData.id,
            name: req.userData.name
        }
    })
    upload.save(async (error, upload) => {
        upload = upload.toJSON();
        if (error) return res.json({ message: 'Tạo mới thất bại' });
        return res.json({
            data: upload.img
        });
    });
});

router.get('/:up_id', (req, res, next) => {
    const data = Upload.findOne({ img: req.req.params.up_id });
    res.json({ data: data })
})

module.exports = router;

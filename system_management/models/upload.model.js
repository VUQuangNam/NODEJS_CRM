const mongoose = require('mongoose');

const UpSchema = mongoose.Schema(
    {
        _id: {
            type: String
        },
        img: {
            type: String
        },
        create_by: {
            id: String,
            name: String
        },
        is_exist: {
            type: Boolean
        }
    }
);

const Upload = module.exports = mongoose.model('Upload', UpSchema, 'uploads');
module.exports.get = function (callback, limit) {
    Upload.find(callback).limit(limit);
}
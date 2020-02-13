const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema(
    {
        _id: {
            type: String
        },
        value: {
            type: String
        },
        is_exist: {
            type: Boolean
        }
    }
);

// Export Token model
const Token = module.exports = mongoose.model('Token', TokenSchema, 'tokens');
module.exports.get = function (callback, limit) {
    Token.find(callback).limit(limit);
}
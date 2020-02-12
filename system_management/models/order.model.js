const mongoose = require('mongoose');
const Product = require('../models/product.model')

const orderSchema = mongoose.Schema(
    {
        _id: {
            type: String
        },
        items: {
            type: [{
                id: String,
                name: String,
                price: Number
            }]
        },
        note: String,
        create_at: {
            type: Number,
            default: Date.now
        },
        create_by: {
            id: String,
            name: String
        }
    }
);

var Order = module.exports = mongoose.model('Order', orderSchema, 'orders');
module.exports.get = function (callback, limit) {
    Order.find(callback).limit(limit);
}

Order.findOneOrder = async (id) => {
    try {
        const data = await Order.findOne({ _id: id });
        if (data) return {
            status: 200,
            data: data
        }
        return {
            status: 404,
            message: 'NOT_FOUND'
        }
    } catch (error) {
        console.log(error);
    }
}
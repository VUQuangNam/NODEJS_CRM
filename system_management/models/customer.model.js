const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const customerSchema = mongoose.Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        order: [],
        email: {
            type: String,
            required: true
        },
        age: Number,
        gender: String,
        phone: String,
        address: {
            type: String,
            default: null
        },
        birthday: Date,
        update_at: {
            type: Number,
            default: Date.now
        },
        create_at: {
            type: Number,
            default: Date.now
        }
    }
);

customerSchema.pre('save', async function (next) {
    const customer = this
    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 8)
    }
    next()
})

customerSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const customer = this
    const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET)
    customer.tokens = customer.tokens.concat({ token })
    await customer.save()
    return token
}

customerSchema.statics.findByCredentials = async (username, password) => {
    const customer = await Customer.findOne({ username })
    if (!customer) {
        throw new Error({ error: 'Thông tin đăng nhập không hợp lệ' })
    }
    const isPasswordMatch = await bcrypt.compare(password, customer.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Thông tin đăng nhập không hợp lệ' })
    }
    return customer
}

var Customer = module.exports = mongoose.model('Customer', customerSchema, 'customers');
module.exports.get = function (callback, limit) {
    Customer.find(callback).limit(limit);
}

Customer.findOneCustomer = async (id) => {
    try {
        const data = await Customer.findOne({ _id: id });
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
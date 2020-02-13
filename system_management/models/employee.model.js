const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const employeeSchema = mongoose.Schema(
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
        role: [String],
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
        create_at: {
            type: Number,
            default: Date.now
        },
        update_at: {
            type: Number,
            default: Date.now
        },
        create_by: {
            id: String,
            name: String
        }
    }
);

employeeSchema.pre('save', async function (next) {
    const employee = this
    if (employee.isModified('password')) {
        employee.password = await bcrypt.hash(employee.password, 8)
    }
    next()
})

employeeSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const employee = this
    const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET)
    employee.tokens = employee.tokens.concat({ token })
    await employee.save()
    return token
}

employeeSchema.statics.findByCredentials = async (username, password) => {
    const employee = await Employee.findOne({ username })
    if (!employee) {
        throw new Error({ error: 'Thông tin đăng nhập không hợp lệ' })
    }
    const isPasswordMatch = await bcrypt.compare(password, employee.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Thông tin đăng nhập không hợp lệ' })
    }
    return employee
}

var Employee = module.exports = mongoose.model('Employee', employeeSchema, 'employees');
module.exports.get = function (callback, limit) {
    Employee.find(callback).limit(limit);
}

Employee.findOneEmployee = async (id) => {
    try {
        const data = await Employee.findOne({ _id: id });
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
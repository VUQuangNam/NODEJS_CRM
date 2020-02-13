const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

Employee = require('../models/employee.model');
Customer = require('../models/customer.model')

exports.login = async (req, res) => {
    try {
        Employee.findOne(
            { username: req.body.username }).exec((error, employee) => {
                if (error) {
                    return res.json({ message: error })
                } else if (!employee) {
                    return res.json({ message: 'Tên đăng nhập và mật khẩu không chính xác' })
                }
                bcrypt.compare(req.body.password, employee.password, (error, result) => {
                    if (error) return res.json({ message: error });
                    if (result === true) {
                        return res.json({
                            message: "Đăng nhập thành công",
                            data: employee,
                            token: jwt.sign({
                                id: employee._id, username: employee.username,
                                name: employee.name, role: employee.role
                            },
                                process.env.JWT_SECRET,
                                { expiresIn: '10d' })
                        })
                    } else {
                        return res.json({ message: 'Tên đăng nhập và mật khẩu không chính xác' })
                    }
                })
            })
    } catch (error) {
        return res.json({ message: error })
    }
}

exports.logincustomer = async (req, res) => {
    try {
        Customer.findOne(
            { username: req.body.username }).exec((error, customer) => {
                if (error) {
                    return res.json({ message: error })
                } else if (!customer) {
                    return res.json({ message: 'Tên đăng nhập và mật khẩu không chính xác' })
                }
                bcrypt.compare(req.body.password, customer.password, (error, result) => {
                    if (error) return res.json({ message: error });
                    if (result === true) {
                        return res.json({
                            message: "Đăng nhập thành công",
                            data: customer,
                            token: jwt.sign({
                                id: customer._id, username: customer.username,
                                name: customer.name
                            },
                                process.env.JWT_SECRET,
                                { expiresIn: '10d' })
                        })
                    } else {
                        return res.json({ message: 'Tên đăng nhập và mật khẩu không chính xác' })
                    }
                })
            })
    } catch (error) {
        return res.json({ message: error })
    }
}
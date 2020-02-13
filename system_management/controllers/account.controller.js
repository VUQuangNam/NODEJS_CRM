const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

Employee = require('../models/employee.model');
Customer = require('../models/customer.model')
Token = require('../models/token.model')

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

exports.changePassEmPloyee = async (req, res) => {
    try {
        const data = await Employee.findOneEmployee(req.userData.id);
        if (data.status === 200) {
            bcrypt.compare(req.body.password_old, data.data.password, async (error, result) => {
                if (result === true) {
                    const body = req.body;
                    body.password = await bcrypt.hash(req.body.password_new, 8)
                    delete body.password_new;
                    delete body.password_old;
                    await Employee.updateOne({ _id: data.data._id }, body);
                    return res.json({
                        message: 'Cập nhật mật khẩu thành công'
                    });
                } else {
                    return res.json({ error: 'Mật khẩu cũ không đúng.' })
                }
            })
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: error })
    }
};

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

exports.changePassCustomer = async (req, res) => {
    console.log(req);
    try {
        const data = await Customer.findOneCustomer(req.userData.id);
        if (data.status === 200) {
            bcrypt.compare(req.body.password_old, data.data.password, async (error, result) => {
                if (result === true) {
                    const body = req.body;
                    body.password = await bcrypt.hash(req.body.password_new, 8)
                    delete body.password_new;
                    delete body.password_old;
                    await Customer.updateOne({ _id: data.data._id }, body);
                    return res.json({
                        message: 'Cập nhật mật khẩu thành công'
                    });
                } else {
                    return res.json({ error: 'Mật khẩu cũ không đúng.' })
                }
            })
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.logout = async (req, res) => {
    try {
        const token = new Token({
            _id: mongoose.Types.ObjectId(),
            value: req.headers.authorization.split(" ")[1],
            is_exist: false
        });
        token.save();
        return res.json({ message: 'Đăng xuất thành công' })
    } catch (error) {
        return res.json({ message: error })
    }
}
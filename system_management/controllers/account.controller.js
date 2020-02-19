const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

Employee = require('../models/employee.model');
Customer = require('../models/customer.model')
Token = require('../models/token.model')

exports.login = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: { username: req.body.username }
        });
        if (!employee) return res.json({ message: 'Tên đăng nhập không chính xác' });
        bcryptjs.compare(req.body.password, employee.password, (error, result) => {
            if (error) return res.json({ error: error });
            if (result === true) {
                return res.json({
                    message: "Đăng nhập thành công",
                    token: jwt.sign({
                        id: employee.id,
                        name: employee.name,
                        roles: employee.roles
                    },
                        process.env.JWT_SECRET,
                        { expiresIn: '10d' })
                })
            }
            return res.json({ message: 'Mật khẩu không chính xác' })
        })
    } catch (error) {
        return res.json({ message: error })
    }
}

exports.changePassEmPloyee = async (req, res) => {
    try {
        const data = await Employee.findOneEmployee(req.userData.id);
        if (data.status === 200) {
            bcryptjs.compare(req.body.password_old, data.data.password, async (error, result) => {
                if (error) return res.json({ error: error });
                if (result === true) {
                    const password = await bcryptjs.hash(req.body.password_new, 8)
                    await Employee.updateOne({ _id: data.data._id }, { password: password });
                    return res.json({
                        message: 'Cập nhật mật khẩu thành công'
                    });
                }
                return res.json({ error: 'Mật khẩu cũ không đúng.' });
            })
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.logincustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: { username: req.body.username }
        });
        if (!customer) return res.json({ message: 'Tên đăng nhập không chính xác' });
        bcryptjs.compare(req.body.password, customer.password, (error, result) => {
            if (error) return res.json({ error: error });
            if (result === true) {
                return res.json({
                    message: "Đăng nhập thành công",
                    token: jwt.sign({
                        id: customer.id,
                        name: customer.name
                    },
                        process.env.JWT_SECRET,
                        { expiresIn: '10d' })
                })
            }
            return res.json({ message: 'Mật khẩu không chính xác' })
        })
    } catch (error) {
        return res.json({ message: error })
    }
}

exports.changePassCustomer = async (req, res) => {
    try {
        const data = await Customer.findOneCustomer(req.userData.id);
        if (data.status === 200) {
            bcryptjs.compare(req.body.password_old, data.data.password, async (error, result) => {
                if (error) return res.json({ error: error });
                if (result === true) {
                    const password = await bcryptjs.hash(req.body.password_new, 8);
                    await Customer.updateOne({ _id: data.data._id }, { password: password });
                    return res.json({ message: 'Cập nhật mật khẩu thành công' });
                }
                return res.json({ error: 'Mật khẩu cũ không đúng.' });
            })
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' });
    } catch (error) {
        return res.json({ error: error });
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
        return res.json({ message: 'Đăng xuất thành công' });
    } catch (error) {
        return res.json({ message: error });
    }
}
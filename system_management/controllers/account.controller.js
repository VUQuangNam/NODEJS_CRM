const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const data = await Employee.findOne({
            where: {
                id: req.userData.id
            }
        })
        if (data) {
            bcryptjs.compare(req.body.password_old, data.password, async (err, result) => {
                if (err) return res.json({ error: err });
                if (result === true) {
                    const password = await bcryptjs.hash(req.body.password_new, 8);
                    await Employee.update({ password: password }, {
                        where: {
                            id: data.id
                        }
                    });
                    return res.json({ message: 'Đổi mật khẩu thành công' })
                }
                return res.json({ message: 'Mật khẩu cũ không đúng' })
            })
        }
    } catch (error) {
        return res.json({ error: error })
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
        const data = await Customer.findOne({
            where: {
                id: req.userData.id
            }
        })
        if (data) {
            bcryptjs.compare(req.body.password_old, data.password, async (err, result) => {
                if (err) return res.json({ error: err });
                if (result === true) {
                    const password = await bcryptjs.hash(req.body.password_new, 8);
                    await Customer.update({ password: password }, {
                        where: {
                            id: data.id
                        }
                    });
                    return res.json({ message: 'Đổi mật khẩu thành công' })
                }
                return res.json({ message: 'Mật khẩu cũ không đúng' })
            })
        }
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.logout = async (req, res) => {
    try {
        await Token.create({
            value: req.headers.authorization.split(" ")[1]
        })
        return res.json({ message: 'Đăng xuất thành công' });
    } catch (error) {
        return res.json({ message: error });
    }
}
const mongoose = require('mongoose');

const Customer = require('../models/customer.model')

exports.list = async (req, res) => {
    try {
        const customers = await Customer.aggregate([
            {
                $match: {
                    $and: req.conditions
                }
            }
        ]);
        customers.forEach(x => {
            delete x.password;
            delete x.__v;
        });
        return res.json({
            count: customers.length,
            data: customers
        });
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.create = async (req, res) => {
    try {
        const { name, username, password, role, email, age, gender, phone, address, birthday } = req.body;
        const customer = new Customer({
            _id: mongoose.Types.ObjectId(),
            name,
            username,
            password,
            role,
            email,
            age,
            gender,
            phone,
            address,
            birthday,
            create_by: {
                id: req.userData.id,
                name: req.userData.name
            }
        });
        let data = await Customer.findOne({
            $or: [
                { username: req.body.username },
                // { email: req.body.email }
            ]
        });
        if (data) {
            return res.json({ message: 'Tên đăng nhập hoặc email đã được sử dụng' })
        } else {
            customer.save(async (error, customer) => {
                customer = customer.toJSON();
                delete customer.password;
                delete customer.__v;
                if (error) {
                    return res.json({ message: 'Tạo mới thất bại' });
                } else {
                    return res.json({
                        message: 'Thêm mới thành công!',
                        data: customer
                    });
                }
            });
        }
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.detail = async (req, res) => {
    try {
        let data = await Customer.findOneCustomer(req.params.customer_id);
        if (data.status === 200) return res.json({ data: data.data })
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: 'Không tìm thấy dữ liệu' })
    }
};

exports.update = async (req, res) => {
    try {
        const { customer_id } = req.params;
        const body = req.body;
        if (body.password) return res.json({ message: 'Không thể đổi mật khẩu trong mục này' })
        body.update_at = Date.now();
        let data = await Customer.findOneCustomer(customer_id);
        if (data.status === 200) {
            await Customer.updateOne({ _id: customer_id }, body);
            return res.json({ message: 'Cập nhật dữ liệu thành công' });
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (err) {
        return res.json({ message: err })
    }
};

exports.delete = async (req, res) => {
    try {
        let data = await Customer.findOneCustomer(req.params.customer_id);
        if (data.status === 200) {
            await Customer.deleteOne({ _id: data.data._id });
            return res.json({ message: 'Xóa Thành Công' });
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: error })
    }
};


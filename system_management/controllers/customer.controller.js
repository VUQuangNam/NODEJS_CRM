const bcryptjs = require('bcryptjs');
const Customer = require('../models/customer.model');
const Order = require('../models/order.model');

const pool = require('../config/query')
const filter = require('../filter/customer.filter');

exports.list = async (req, res) => {
    try {
        const customers = await Customer.findAndCountAll({
            where: req.conditions,
            // include: [{
            //     model: Order,
            //     attributes: ['id', [11, "orders"]]
            // }]
        });
        return res.json(customers)
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.create = async (req, res) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 8)
        const data = await Customer.create(req.body);
        return res.json({
            message: 'Thêm mới thành công',
            data: data
        })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.detail = async (req, res) => {
    try {
        const filterCus = filter(req.params);
        const customer = await pool.query(`${filterCus}`);
        return res.json({
            data: customer.rows
        })
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.update = async (req, res) => {
    try {
        const check = await Customer.findOne({
            where: {
                id: req.params.customer_id
            }
        });
        if (check) {
            await Customer.update(req.body, {
                where: {
                    id: req.params.customer_id
                }
            }); return res.json({ message: 'Cập nhật dữ liệu thành công' })
        }
        return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: error })
    }
}


exports.delete = async (req, res) => {
    try {
        await Customer.destroy({
            where: {
                id: req.params.customer_id
            }
        });
        return res.json({ message: 'Xóa thành công' })
    } catch (error) {
        return res.json({ message: error })
    }
};


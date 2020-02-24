const Product = require('../models/product.model');
const Employee = require('../models/employee.model');

const pool = require('../config/query');
const filter = require('../filter/product.filter');

exports.list = async (req, res) => {
    try {
        const products = await Product.findAndCountAll({
            where: req.conditions
        });
        return res.json(products)
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.create = async (req, res) => {
    try {
        const check = await Employee.findOne({
            where: { id: req.userData.id }
        })
        if (check && req.userData.roles) {
            req.body.create_by = {
                id: check.id,
                name: check.name
            }
            const data = await Product.create(req.body);
            return res.json({
                message: 'Thêm mới thành công',
                data: data
            })
        }
        return res.json({ message: 'Unauthorized' })
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.detail = async (req, res) => {
    try {
        const data = await Product.findOne({
            where: { id: req.params.product_id }
        });
        if (data && data.create_by.id === req.userData.id) return res.json({ data: data });
        return res.json({ message: 'Unauthorized' })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Product.findOne({
            where: { id: req.params.product_id }
        })
        if (data && data.create_by.id === req.userData.id) {
            await Product.update(req.body, {
                where: {
                    id: req.params.product_id
                }
            }); return res.json({ message: 'Cập nhật dữ liệu thành công' })
        }
        return res.json({ message: 'Không tìm thấy thông tin đơn hàng' })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Product.findOne({
            where: { id: req.params.product_id }
        });
        if (data && data.create_by.id === req.userData.id) {
            await Product.destroy({
                where: { id: data.id }
            });
            return res.json({ message: 'Xóa thành công' })
        };
        return res.json({ message: 'Unauthorized' })
    } catch (error) {
        return res.json({ error: error })
    }
};

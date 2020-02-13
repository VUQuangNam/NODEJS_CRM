const mongoose = require('mongoose');

const Product = require('../models/product.model');
const Employee = require('../models/employee.model');


exports.list = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $match: {
                    $and: req.conditions
                }
            }
        ]);
        return res.json({
            count: products.length,
            data: products
        });
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.create = async (req, res) => {
    try {
        const data = await Employee.findOneEmployee(req.userData.id);
        if (data.status === 200 && req.userData.role) {
            const { name, note, price, unit } = req.body;
            const product = new Product({
                _id: mongoose.Types.ObjectId(),
                name, price, unit, note,
                create_by: {
                    id: req.userData.id,
                    name: req.userData.name
                }
            });
            let result = await Product.findOne({ $or: [{ name: req.body.name }] });
            if (result) return res.json({ message: 'Tên sản phẩm đã được sử dụng' })
            product.save(async (error, product) => {
                product = product.toJSON();
                delete product.password;
                delete product.__v;
                if (error) return res.json({ message: 'Tạo mới thất bại' });
                return res.json({
                    message: 'Thêm mới thành công!',
                    data: product
                });
            });
        }
        if (!data.data || !req.userData.role) return res.json({ message: 'Unauthorized' })
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.detail = async (req, res) => {
    try {
        let data = await Product.findOneProduct(req.params.product_id);
        if (data.status === 200) return res.json({ data: data.data })
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: 'Không tìm thấy dữ liệu' })
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Employee.findOneEmployee(req.userData.id);
        if (data.status === 200 && req.userData.role) {
            const { product_id } = req.params;
            const body = req.body;
            if (body.password) return res.json({ message: 'Không thể đổi mật khẩu trong mục này' })
            body.update_at = Date.now();
            let result = await Product.findOneProduct(product_id);
            if (result.status === 200) {
                await Product.updateOne({ _id: product_id }, body);
                return res.json({ message: 'Cập nhật dữ liệu thành công' });
            }
            if (!result.data) return res.json({ message: 'Không tìm thấy thông tin sản phẩm' })
        }
        if (!data.data || !req.userData.role) return req.json({ message: 'Unauthorized' })
    } catch (err) {
        return res.json({ message: err })
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Employee.findOneEmployee(req.userData.id);
        if (data.status === 200 && req.userData.role) {
            let result = await Product.findOneProduct(req.params.product_id);
            if (result.status === 200) {
                await Product.deleteOne({ _id: result.data._id });
                return res.json({ message: 'Xóa Thành Công' });
            }
            if (!result.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
        }
        if (!data.data || !req.userData.role) return res.json({ message: 'Unauthorized' })
    } catch (error) {
        return res.json({ message: error })
    }
};

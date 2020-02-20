const Order = require('../models/order.model');
const Customer = require('../models/customer.model');

const pool = require('../config/query')
const filter = require('../filter/order.filter')

exports.list = async (req, res) => {
    try {
        const filterOrder = filter(req.query);
        const orders = await pool.query(`${filterOrder}`);
        return res.json({
            count: orders.rows.length,
            data: orders.rows
        })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.create = async (req, res) => {
    try {
        const check = await Customer.findOne({
            where: { id: req.userData.id }
        })
        if (!req.body.products || !req.body.products.length)
            return res.json({ message: 'Vui lòng thêm sản phẩm vào đơn hàng' })
        if (check && req.body.products.length) {
            total = 0;
            req.body.products.forEach(async (x) => {
                if (!x.quantity) { total = total }
                else {
                    total = total + (x.price * x.quantity);
                }
            });
            req.body.discount = req.body.discount || 0;
            req.body.total_price = total;
            req.body.status = 'Đặt hàng';
            req.body.create_by = {
                id: check.id,
                name: check.name
            }
            req.body.create_by_id = check.id;
            const data = await Order.create(req.body);
            return res.json({
                message: 'Thêm mới thành công',
                data: data
            })
        }
        return res.json({ message: 'Không tìm thấy dữ liệu tài khoản' })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.detail = async (req, res) => {
    try {
        const data = await Order.findOne({
            where: { id: req.params.order_id }
        })
        if (data && data.create_by.id === req.userData.id) return res.json({ data: data });
        return res.json({ message: 'Không tìm thấy thông tin đơn hàng' })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Order.findOne({
            where: { id: req.params.order_id }
        })
        if (data && data.create_by.id === req.userData.id) {
            await Order.update(req.body, {
                where: {
                    id: req.params.order_id
                }
            }); return res.json({ message: 'Cập nhật dữ liệu thành công' })
        }
        return res.json({ message: 'Không tìm thấy thông tin đơn hàng' })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.cancel = async (req, res) => {
    try {
        const data = await Order.findOne({
            where: { id: req.params.order_id }
        })
        if (data && data.create_by.id === req.userData.id) {
            await Order.update(req.body, {
                where: {
                    id: req.params.order_id
                }
            }); return res.json({ message: 'Đơn hàng đã được hủy' })
        }
        return res.json({ message: 'Không tìm thấy thông tin đơn hàng' })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.confirm = async (req, res) => {
    try {
        const data = await Order.findOne({
            where: { id: req.params.order_id }
        })
        if (data && data.create_by.id === req.userData.id) {
            await Order.update(req.body, {
                where: {
                    id: req.params.order_id
                }
            }); return res.json({ message: 'Đơn hàng đã được giao' })
        }
        return res.json({ message: 'Không tìm thấy thông tin đơn hàng' })
    } catch (error) {
        return res.json({ error: error })
    }
};

// exports.delete = async (req, res) => {
//     try {
//         let data = await Order.findOneOrder(req.params.order_id);
//         if (data.status === 200) {
//             await Order.deleteOne({ _id: data.data._id });
//             return res.json({ message: 'Xóa Thành Công' });
//         }
//         if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
//     } catch (error) {
//         return res.json({ message: error })
//     }
// };

const mongoose = require('mongoose');

const Order = require('../models/order.model');
const Customer = require('../models/customer.model');

exports.list = async (req, res) => {
    try {
        if (req.userData.role) {
            const orders = await Order.aggregate([
                {
                    $match: {
                        $and: req.conditions
                    }
                }
            ]);
            return res.json({
                count: orders.length,
                data: orders
            });
        }
        let customers = await Customer.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'create_by.id',
                    as: 'orders'
                },
            }
        ]);
        const check = customers.findIndex(x => x._id === req.userData.id);
        return res.json({
            data: customers[check].orders
        })
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.create = async (req, res) => {
    try {
        const { items, note } = req.body;
        total = 0;
        req.body.items.forEach(async (x) => {
            total = total + (x.price * x.quantity);
        });
        discount = req.body.discount || 0;
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            items,
            note,
            status: 'Đặt hàng',
            total_price: total,
            discount: discount,
            create_by: {
                id: req.userData.id,
                name: req.userData.name
            }
        });
        order.save(async (error, order) => {
            if (error) return res.json({ message: error });
            let data = await Customer.findOneCustomer(req.userData.id);
            if (data.status === 200) {
                return res.json({
                    message: 'Thêm mới thành công!',
                    data: order
                });
            }
            if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
        });
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.detail = async (req, res) => {
    try {
        let data = await Order.findOneOrder(req.params.order_id);
        if ((data.status === 200 && req.userData.id === data.data.create_by.id) ||
            req.userData.role
        ) return res.json({ data: data.data })
        if (!data.data || (req.userData.id === data.data.create_by.id))
            return res.json({ message: 'Không tìm thấy thông tin đơn hàng' });
    } catch (error) {
        return res.json({ message: 'Không tìm thấy dữ liệu' })
    }
};

exports.update = async (req, res) => {
    try {
        const { order_id } = req.params;
        let data = await Order.findOneOrder(order_id);
        if (data.status === 200 && req.userData.id === data.data.create_by.id) {
            if (req.body.note) {
                await Order.updateOne({ _id: order_id }, { note: req.body.note });
                return res.json({ message: 'Cập nhật dữ liệu thành công' });
            }
            return res.json({ message: 'Không thể thay đổi thông tin này' })
        }
        if (!data.data || !(req.userData.id === data.data.create_by.id)) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (err) {
        return res.json({ message: err })
    }
};

exports.cancel = async (req, res) => {
    try {
        const { order_id } = req.params;
        let data = await Order.findOneOrder(order_id);
        if (data.status === 200 && req.userData.id === data.data.create_by.id) {
            await Order.updateOne({ _id: order_id }, { status: 'Đã hủy' });
            return res.json({ message: 'Đơn hàng đã được hủy' });
        }
        if (!data.data || !(req.userData.id === data.data.create_by.id))
            return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (err) {
        return res.json({ message: err })
    }
};

exports.confirm = async (req, res) => {
    try {
        const { order_id } = req.params;
        let data = await Order.findOneOrder(order_id);
        if (data.status === 200 && req.userData.id === data.data.create_by.id) {
            await Order.updateOne({ _id: order_id }, { status: 'Hoàn thành' });
            return res.json({ message: 'Đơn hàng đã được giao' });
        }
        if (!data.data || !(req.userData.id === data.data.create_by.id))
            return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (err) {
        return res.json({ message: err })
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

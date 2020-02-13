const mongoose = require('mongoose');

const Order = require('../models/order.model');
const Customer = require('../models/customer.model');

exports.list = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                $match: {
                    $and: req.conditions
                }
            }
        ]);
        orders.forEach(x => {
            delete x.password;
            delete x.__v;
        });
        return res.json({
            count: orders.length,
            data: orders
        });
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.create = async (req, res) => {
    try {
        const { items, note } = req.body;
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            items,
            note,
            status: 'Đặt hàng',
            create_by: {
                id: req.userData.id,
                name: req.userData.name
            }
        });
        order.save(async (error, order) => {
            if (error) {
                return res.json({ message: error });
            } else {
                let data = await Customer.findOneCustomer(req.userData.id);
                if (data.status === 200) {
                    return res.json({
                        message: 'Thêm mới thành công!',
                        data: order
                    });
                }
                if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
            }
        });
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.detail = async (req, res) => {
    try {
        let data = await Order.findOneOrder(req.params.order_id);
        if (data.status === 200) return res.json({ data: data.data })
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: 'Không tìm thấy dữ liệu' })
    }
};

exports.update = async (req, res) => {
    try {
        const { order_id } = req.params;
        const body = req.body;
        let data = await Order.findOneOrder(order_id);
        if (data.status === 200) {
            await Order.updateOne({ _id: order_id }, body);
            return res.json({ message: 'Cập nhật dữ liệu thành công' });
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
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

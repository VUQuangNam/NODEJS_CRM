const bcryptjs = require('bcryptjs');

Employee = require('../models/employee.model');

exports.list = async (req, res) => {
    try {
        Employee.findAll().then(empolyee => {
            return res.json({
                count: empolyee.length,
                data: empolyee
            })
        });
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.create = async (req, res) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 8);
        req.body.roles = req.body.roles || [];
        const data = await Employee.create(req.body);
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
        const data = await Employee.findOne({
            where: {
                id: req.params.employee_id
            }
        })
        if (data) return res.json({ data: data })
    } catch (error) {
        return res.json({ error: error })
    }
};

exports.update = async (req, res) => {
    try {
        const check = await Employee.findOne({
            where: {
                id: req.params.employee_id
            }
        });
        if (check) {
            await Employee.update(req.body, {
                where: {
                    id: req.params.employee_id
                }
            }); return res.json({ message: 'Cập nhật dữ liệu thành công' })
        }
        return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Employee.destroy({
            where: {
                id: req.params.employee_id
            }
        })
        if (data) return res.json({ message: 'Xóa dữ liệu thành công' });
        return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ error: error })
    }
};


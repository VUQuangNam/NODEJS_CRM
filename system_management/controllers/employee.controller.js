const mongoose = require('mongoose');

Employee = require('../models/employee.model');

exports.list = async (req, res) => {
    try {
        const employees = await Employee.aggregate([
            {
                $match: {
                    $and: req.conditions
                }
            }
        ]);
        employees.forEach(x => {
            delete x.password;
            delete x.__v;
        });
        return res.json({
            count: employees.length,
            data: employees
        });
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.create = async (req, res) => {
    try {
        const { name, username, password, role, email, age, gender, phone, address, birthday } = req.body;
        const employee = new Employee({
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
        let data = await Employee.findOne({
            $or: [
                { username: req.body.username }
            ]
        });
        if (data) return res.json({ message: 'Tên đăng nhập đã được sử dụng' })
        employee.save(async (error, employee) => {
            employee = employee.toJSON();
            delete employee.password;
            delete employee.__v;
            if (error) return res.json({ message: error });
            return res.json({
                message: 'Thêm mới thành công!',
                data: employee
            });
        });
    } catch (error) {
        return res.json({ message: error })
    }
};

exports.detail = async (req, res) => {
    try {
        let data = await Employee.findOneEmployee(req.params.employee_id);
        if (data.status === 200) return res.json({ data: data.data })
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: 'Không tìm thấy dữ liệu' })
    }
};

exports.update = async (req, res) => {
    try {
        const { employee_id } = req.params;
        const body = req.body;
        if (body.password) return res.json({ message: 'Không thể đổi mật khẩu trong mục này' })
        body.update_at = Date.now();
        let data = await Employee.findOneEmployee(employee_id);
        if (data.status === 200) {
            await Employee.updateOne({ _id: employee_id }, body);
            return res.json({ message: 'Cập nhật dữ liệu thành công' });
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (err) {
        return res.json({ message: err })
    }
};

exports.delete = async (req, res) => {
    try {
        let data = await Employee.findOneEmployee(req.params.employee_id);
        if (data.status === 200) {
            await Employee.deleteOne({ _id: data.data._id });
            return res.json({ message: 'Xóa Thành Công' });
        }
        if (!data.data) return res.json({ message: 'Không tìm thấy dữ liệu' })
    } catch (error) {
        return res.json({ message: error })
    }
};


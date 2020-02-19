const User = require('../models/user.model');

exports.list = async (req, res) => {
    try {
        User.findAll().then(users => {
            return res.json({ data: users })
        });
    } catch (error) {
        return res.json({ message: error })
    }
}

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.json(user)
    } catch (error) {
        return res.json({ message: error })
    }
}

exports.detail = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.user_id
            }
        });
        return res.json(user)
    } catch (error) {
        return res.json({ message: error })
    }
}

exports.update = async (req, res) => {
    try {
        const check = await User.findOne({
            where: {
                id: req.params.user_id
            }
        });
        if (check) {
            await User.update(req.body, {
                where: {
                    id: req.params.user_id
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
        const user = await User.destroy({
            where: {
                id: req.params.user_id
            }
        });
        return res.json(user)
    } catch (error) {
        return res.json({ message: error })
    }
}



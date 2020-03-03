const { Op } = require('sequelize');

exports.condition = async (req, res, next) => {
    try {
        const params = req.query ? req.query : {};
        let condition = {};
        let start; let end;
        if (params.start_time && params.end_time) {
            start = new Date(params.start_time), end = new Date(params.end_time);
            start.setHours(0, 0, 0, 0); end.setHours(23, 59, 59, 999);
        }
        if (params.keyword) {
            condition.id = params.keyword;
        }

        if (params.by_date === 'create' && start && end) {
            condition.createdAt = {
                [Op.between]: [start, end]
            }
        }

        if (params.by_date === 'update' && start && end) {
            condition.updatedAt = {
                [Op.between]: [start, end]
            }
        }
        req.conditions = condition;
        return next();
    } catch (error) {
        return res.json({ message: error })
    }
}
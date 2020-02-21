const sequelize = require('sequelize');
const { Op } = sequelize;

exports.condition = async (req, res, next) => {
    try {
        const params = req.query ? req.query : {};
        let condition = {};
        if (params.keyword) {
            condition[Op.or] = [
                {
                    id: {
                        [Op.iLike]: `%${params.keyword}%`
                    }
                }
            ]
        }
        req.conditions = condition;
        return next();
    } catch (error) {
        return res.json({ message: error })
    }
}
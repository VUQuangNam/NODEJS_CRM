const sequelize = require('sequelize');
const { Op } = sequelize;

exports.condition = async (req, res, next) => {
    try {
        const params = req.query ? req.query : {};
        let condition = {};
        if (params.keyword) {
            condition[Op.or] = [
                {
                    name: {
                        [Op.iLike]: `%${params.keyword}%`
                    }
                },
                {
                    username: {
                        [Op.iLike]: `%${params.keyword}%`
                    }
                },
                {
                    phone: {
                        [Op.iLike]: `%${params.keyword}%`
                    }
                }
            ]
        }
        if (params.gender) {
            condition.gender = params.gender || '';
        }
        if (params.minAge > 0 && params.maxAge && params.maxAge > params.minAge) {
            condition.age = {
                [Op.between]: [params.minAge, params.maxAge]
            }
        }
        req.conditions = condition;
        return next();
    } catch (error) {
        return res.json({ message: error })
    }
}
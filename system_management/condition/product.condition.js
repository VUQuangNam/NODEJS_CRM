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
                }
                // {
                //     id: {
                //         [Op.iLike]: `%${params.keyword}%`
                //     }
                // }
            ]
        }
        if (params.unit) {
            condition.unit = params.unit || '';
        }
        if (params.minPrice > 0 && params.maxPrice && params.maxPrice > params.minPrice) {
            condition.price = {
                [Op.between]: [params.minPrice, params.maxPrice]
            }
        }
        req.conditions = condition;
        return next();
    } catch (error) {
        return res.json({ message: error })
    }
}